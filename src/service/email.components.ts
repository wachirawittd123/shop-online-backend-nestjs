import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { SettingService } from '../common/setting';
import { IVerifyEmailFormat } from '../interface/common.interface';

@Injectable()
export class EmailComponents {
    static randCode(): string {
        return bcrypt.randomBytes(48).toString("hex");
    }
    
    static formatVerifyEmail({
        title,
        description,
        subTitle,
        uri,
        buttonText,
        endCredit,
        unsubText,
        userEmail
    }: IVerifyEmailFormat): string {
        const styles = `
            /* Reset styles */ 
            body {
                font-family: 'Prompt', sans-serif;
                height: 100% !important;
                margin: 0; 
                min-width: 100%;
                padding: 0; 
                width: 100% !important; 
            }
            body, table, td, div, p, a {
                line-height: 100%;
                text-size-adjust: 100%;
                -webkit-font-smoothing: antialiased; 
                -ms-text-size-adjust: 100%; 
                -webkit-text-size-adjust: 100%;
            }
            table, td {
                border-collapse: collapse !important; 
                border-spacing: 0;
                mso-table-lspace: 0pt; 
                mso-table-rspace: 0pt; 
            }
            img {
                border: 0; 
                line-height: 100%; 
                outline: none; 
                text-decoration: none; 
                -ms-interpolation-mode: bicubic;
            }
            .action-item {
                border: 1px solid #005f7f;
                color: #005f7f;
                padding: 8px 20px;
            }
            .action-item:hover {
                background-color: #2a923d;
                border: 1px solid #2a923d;
                color: #fff;
            }
            #outlook a {padding: 0;}
            .ReadMsgBody {width: 100%;}
            .ExternalClass {width: 100%;}
            .ExternalClass, 
            .ExternalClass p, 
            .ExternalClass span, 
            .ExternalClass font, 
            .ExternalClass td, 
            .ExternalClass div {line-height: 100%;}
        
            /* Rounded corners for advanced mail clients only */ 
            @media all and (min-width: 560px) {
                .container {
                    border-radius: 8px; 
                    -webkit-border-radius: 8px; 
                    -moz-border-radius: 8px; 
                    -khtml-border-radius: 8px;
                }
            }
            /* Set color for auto links (addresses, dates, etc.) */ 
            .footer a, 
            .footer a:hover {
                color: #999999;
            }
            .button {
                font-family: 'Prompt', sans-serif;
                height:38px;
                position: relative;
                left: 0px;
                right: 0px;
                border:none;
                border-radius:3px;
                color: #fff !important;
                background-color: ${SettingService.APP_MAIN_COLOR};
                outline:none;
                font-size:0.85em;
                padding: 8px 18px 6px 18px;
                opacity:1;
                cursor:pointer;
                text-decoration: none;
            }
            .taA {}
            .button:hover {
                opacity:0.9;
                text-decoration: none;
            }
        `;

        const emailContent = `
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="content-type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0;">
                <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
                <style>${styles}</style>
                <title>${SettingService.APP_NAME}</title>
            </head>
            <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; background-color: #ececec; color: #333333;" bgcolor="#ececec" text="#333333">
                <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;">
                    <tbody>
                        <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;" bgcolor="#ececec">
                                <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit; max-width: 560px; margin: 30px 0 0 0;" class="container">
                                    <tbody>
                                        <tr>
                                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-top: 20px;">
                                                <img border="0" vspace="0" hspace="0" src=${SettingService.APP_LOGO} alt=${SettingService.APP_NAME} title=${SettingService.APP_NAME} width="150" style="border: none; color: #333333; display: block; font-size: 13px; margin: 0; max-width: 150px; padding: 0; outline: none; text-decoration: none; width: 100%; -ms-interpolation-mode: bicubic;" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 5px 6.25% 3px 6.25%; width: 87.5%; line-height: 150%;">
                                                <h3 style="color: #333; font-family: 'Prompt', sans-serif; font-size: 22px; font-weight: 800; line-height: 100%; margin: 20px 0 10px 0; padding: 0;">${title}</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;">
                                                <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Prompt', sans-serif;">${subTitle}</p>
                                                <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Prompt', sans-serif;">${description}</p>
                                                <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Prompt', sans-serif; text-align: center;">
                                                    <a class=${endCredit ? "button" : "taA"} href="${uri}">${buttonText}</a>
                                                </p>
                                                <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Prompt', sans-serif;">
                                                    <a class="taA" href="${uri?.replace("control/payments/credit", "/unsubscribe-email?" + userEmail)}">${unsubText}</a>
                                                </p>
                                                <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Prompt', sans-serif;">
                                                    ${endCredit ? SettingService.MAIL_FROM : "Thank you"}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top" style="border-collapse: collapse; border-spacing: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;">
                                                <p style="font-size: 10px; font-weight: 400; line-height: 100%; color: #333333; font-family: 'Prompt', sans-serif;">&nbsp;</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" align="center" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit; max-width: 560px;" class="wrapper">
                                    <tbody>
                                        <tr>
                                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; font-size: 12px; font-weight: 400; line-height: 150%; padding-top: 20px; padding-bottom: 20px; color: #999999; font-family: 'Prompt', sans-serif;" class="footer">
                                                Copyright &copy; 2024 iApp Technology. All Rights Reserved.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
            </html>
        `;

        return emailContent;
    }
}
