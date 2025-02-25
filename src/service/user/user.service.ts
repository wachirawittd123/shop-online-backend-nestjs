import { Injectable } from '@nestjs/common';
import { IPwd, IQuerys, IResetPwd, ISendVerifyEmail, ISignup, IUpdateUserVerify, IUser, IUserProfile } from 'src/interface';
import { PrismaService } from '../../common/prisma.service';
import { UserComponents } from './user.components';
import { CommonComponents, CustomError } from '../common.components';
import { ConfigService } from 'src/common/config';
import { SettingService } from 'src/common/setting';
import { EmailComponents } from '../email.components';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(args: IQuerys): Promise<{ data: IUser[]; total: number; totalPages: number }> {
    const { skip = 0, limit = 10 } = args; // Default values for page and limit
    const where = UserComponents.genUserQuery(args);

    // Calculate the total number of users
    const total = await this.prisma.user.count({ where });

    // Calculate the number of pages
    const totalPages = Math.ceil(total / limit);
    
    // Fetch the users with pagination
    const users: IUser[] | any = await this.prisma.user.findMany({
      where,
      skip: Number(skip),  // Ensure skip is an integer
      take: Number(limit), // Ensure limit is an integer
      include: {
        verify: true, // Include the UserVerify relation
      },
    })
    return { data: users, totalPages, total };
  }  

  async signup(data: ISignup): Promise<any> {
    const { email, password = "", phone = "", name = "", method = "" } = data;
    if (!email) throw new CustomError("Email is required", 400);
    const lowerCaseEmail: string = email?.toLowerCase();
    let update: any = null;

    if (data.method === "open-parliament-hack2024-register") {
      const totalCount = await UserComponents.getParliamentUserCount(this.prisma);
      console.log("countLimitRegister ====> ", totalCount);

      if (totalCount <= 800) {
        const checkUser = await UserComponents.findUser(this.prisma, { email: lowerCaseEmail });
        if (checkUser) {
          UserComponents.handleExistingUser({ prisma: this.prisma, checkUser, email: lowerCaseEmail });
        } else {
          update = await UserComponents.createNewParliamentUser({ prisma: this.prisma, email: lowerCaseEmail, password, phone, name });
        }
      } else {
        throw new CustomError("Token ฟรี 2500 IC สำหรับทดลองใช้งาน มีผู้รับสิทธิ์เต็มจำนวนแล้ว, สอบถามเพิ่มเติมได้ที่ info@iapp.co.th", 400);
      }
    } else {
      update = await UserComponents.createNewUser({ prisma: this.prisma, email: lowerCaseEmail, password, phone, name });
    }

    return update;
  }
  async sendVerifyEmail(data: ISendVerifyEmail): Promise<any> {
    return await UserComponents.sendVerifyEmail({prisma: this.prisma, email: data.email})
  }
  async verifyEmail(data: IUpdateUserVerify): Promise<any> {
    return await UserComponents.updateUserVerify({prisma: this.prisma, code: data.code, userId: data.userId})
  }
  async forgetPwd(data: ISendVerifyEmail): Promise<any> {
    const user = await UserComponents.findUser(this.prisma, {email: data.email})
    if (!user) throw new CustomError("User not found", 400);
    if (user && user.provider !== "local") throw new CustomError(`E-mail ${data.email} สมัครด้วย ${user.provider}`, 400);
    let code = CommonComponents.randCode()
    await ConfigService.sendEmail({
        from: `iApp-Forgot Password <${SettingService.MAIL_FROM || "info@iapp.co.th"}>`,
        to: data.email,
        subject: `Reset Password`,
        text: `${SettingService.APP_NAME} - Forgot Password`,
        html: EmailComponents.formatVerifyEmail({
            title: "Forgot Password",
            description: ``,
            subTitle: "Click the button for reset your password",
            uri: `${SettingService.FRONT_END_URL}/reset/${code}`,
            buttonText: "Reset Password",
        }),
    })
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { ftoken: code },
    });
    return updatedUser
  }
  async resetPwd(data: IResetPwd): Promise<IUser | any> {
    const { ftoken, password } = data;
    // Find the user by ftoken using Prisma
    const user: IUser | null = await UserComponents.findUser(this.prisma, {ftoken: ftoken})
    if (!user) {
      throw new CustomError("เกิดข้อผิดพลาด กรุณาทำขั้นตอนการลืมรหัสผ่านใหม่อีกครั้ง", 400);
    }
  
    if (user && user.provider !== "local") {
      throw new CustomError(`E-mail ${user.email} สมัครด้วย ${user.provider}`, 400);
    }
    
    let newPwd = await CommonComponents.hashedPassword(password)
    // Update the user's password and clear the ftoken
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { password: newPwd.newPassword, salt: newPwd.salt, ftoken: "" },
    });
  
    return updatedUser;
  }
  async changePwd(data: IPwd, user: IUserProfile): Promise<IUser | any> {
    const { oldPassword, newPassword } = data;
    let updateData: any = {}
    const findUser: IUser | any = await UserComponents.findUser(this.prisma, { id: user.id });
    if (!findUser) throw new CustomError("User not found", 400);
    if (newPassword && !oldPassword) throw new CustomError("Please provide your old password", 400);
    if (!newPassword && oldPassword) throw new CustomError("Please provide a new password", 400);
    const hashedPwd = await CommonComponents.hashedPassword(newPassword as string)
    updateData = { password: hashedPwd?.newPassword, salt: hashedPwd?.newPassword }
    if (newPassword && oldPassword && oldPassword !== "create") {
      const authenticated = await bcrypt.compare(newPassword, findUser?.password);
      const oldAuthenticated = await bcrypt.compare(oldPassword, findUser?.password);
      if (authenticated) {
        throw new CustomError("New password cannot be the same as the old password", 400);
      } else if (!oldAuthenticated) {
        throw new CustomError("Old password is incorrect", 400);
      }
    } else if (newPassword && oldPassword === "create") {
      updateData = {...updateData, provider: "local" }
      await this.prisma.userVerify.update({
        where: { userId: user?.id}, 
        data: { status: true, code: "" }
      })
    }
    return await this.prisma.user.update({where: {id: user?.id}, data: updateData})
  }
}
