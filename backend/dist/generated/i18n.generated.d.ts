import { Path } from "nestjs-i18n";
export type I18nTranslations = {
    "lang": {
        "auth": {
            "Wellcome": string;
            "WellcomeBack": string;
            "Success": string;
            "UsernameError": string;
            "DNIError": string;
            "mailError": string;
            "WrongLogin": string;
        };
        "persons": {};
        "users": {
            "User": string;
            "Password": string;
            "CreateOK": string;
            "UpdateOK": string;
            "CreateError": string;
            "UpdateError": string;
            "DeleteOK": string;
            "DeleteError": string;
            "UserNotFound": string;
            "ReadOK": string;
        };
        "tickets": {
            "CreateOK": string;
            "UpdateOK": string;
            "CreateError": string;
            "UpdateError": string;
            "ReasignToUserError": string;
            "TicketNotFound": string;
        };
        "audit": {};
    };
};
export type I18nPath = Path<I18nTranslations>;
