export function validations(errors, name, value)
{

    function validateEmail(email)
    {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validatePassword(value)
    {
        if (!value)
        {
            return 'Password is required';
        } else if (value.length < 6)
        {
            return 'Password must be alteast 6 characters long';
        } else if (value.search(/[a-zA-Z]/) === -1)
        {
            return 'Password must contain atleast one letter';
        } else if (value.search(/\d/) === -1)
        {
            return 'Password must contain atleast one number';
        } else
        {
            return '';
        }
    }

    switch (name)
    {
        case 'username':
            errors.username = !value
                ? 'username is required'
                : value.length < 6
                    ? 'username should be atleast 6 characters'
                    : '';
            break;
        case 'password':
            errors.password = validatePassword(value);
            break;
        case 'email':
            errors.email = !value
                ? 'email is required'
                : validateEmail(value)
                    ? ''
                    : 'Email is invalid';
            break;
        default:
            break;
    }
}