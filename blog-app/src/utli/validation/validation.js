export default function Validation(errors, name, value)
{
    switch (name)
    {
        case "email":
            let emailError = value.indexOf("@") === -1 ? `Email does not contain @` : "";
            errors.email = emailError;
            break;
        case "username":
            let usernameError = value.length < 7 ? `Username cant be less then 7 character ` : "";
            errors.username = usernameError;
            break;
        case "password":
            let passwordError
            let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (value.length < 8)
            {
                passwordError = `password cant be less then 8 character`
            } else if (!re.test(value))
            {
                passwordError = "password must contain a character and a number";
            }
            errors.password = passwordError;
            break;
        default:
            return errors;

    }
}
