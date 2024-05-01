document.addEventListener('DOMContentLoaded', function () {
    const validation = new JustValidate('#signup');

    validation
        .addField('#name', [
            {
                rule: 'required',
                errorMessage: 'Name is required',
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Email is required',
            },
            {
                rule: 'email',
                errorMessage: 'Email is invalid',
            },
        ])
        .addField('#password', [
            {
                rule: 'required',
                errorMessage: 'Password is required',
            },
            {
                rule: 'password',
                errorMessage: 'Must meet complexity requirements',
            },
        ])
        .addField('#password_confirmation', [
            {
                validator: (value, fields) => {
                    return value === fields['#password'].elem.value;
                },
                errorMessage: 'Passwords do not match',
            },
        ])
        .onSuccess((event) => {
            event.target.submit();
        });
});
