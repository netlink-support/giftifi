   $(document).ready(function () {

    $.validator.addMethod("noSpaces", function(value, element) {
        return value.indexOf(" ") === -1; 
     }, "Spaces are not allowed.");

       $(".queries-form").each(function () {
         $(this).validate({
            errorElement: 'div',
            errorClass: 'error_form',
            onkeyup: false,
            rules: {
                first_name: {
                    required: true,
                    noSpaces: true
                },
                last_name: {
                    required: true,
                    noSpaces: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    digits: true,
                    minlength: 10
                },
                interest: {
                    required: true
                },
                organization: {
                    required: true,
                },
                city: {
                    required: true,
                    noSpaces: true
                }
            },
            messages: {
                first_name: {
                    required: "Please enter your first name.",
                    noSpaces: "Spaces are not allowed in the first name."
                },
                last_name: {
                    required: "Please enter your last name.",
                    noSpaces: "Spaces are not allowed in the last name."
                },
                email: {
                    required: "Please enter a valid email address.",
                    email: "Please enter a valid email.",
                    noSpaces: "Spaces are not allowed in the email address."
                },
                phone: {
                    required: "Please enter your phone number.",
                    digits: "Please enter a valid phone number.",
                    minlength: "Your phone number must be at least 10 digits."
                },
                interest: {
                    required: "Please select an interest."
                },
                organization: {
                    required: "Please enter your organization name.",
                },
                city: {
                    required: "Please enter a city.",
                    noSpaces: "Spaces are not allowed in the city name."
                }
            },
            errorPlacement: function (error, element)
            {
                error.insertAfter(element);
            },
            highlight: function(element) {
                $(element).addClass("is-invalid");
            },
            unhighlight: function(element) {
                $(element).removeClass("is-invalid");
            },
            submitHandler: function (form) {
                
                let flagValue = $(form).find('input[name="flag"]').val();
                
                if (flagValue == "brochure") {
                  let submitButton = $(".download-brochure-button");
                  submitButton.prop("disabled", true);
                  submitButton.html(
                    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...'
                  );
                } else if (flagValue == "querie") {
                  let submitButton = $(".download-querie-button");
                  submitButton.prop("disabled", true);
                  submitButton.html(
                    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...'
                  );
                }
                
                if (typeof grecaptcha === 'undefined') {
                    console.error("reCAPTCHA CDN not found or not loaded.");
                    $('#form_response').prepend('<p style="font-size: 17px; font-weight: 600;" class="text-danger">There was some problem, please try again after sometime.</p>');
                    return; 
                }
                grecaptcha.enterprise.execute('6LfoRqAqAAAAAK3G1RcmDp09XV0y9b1P-ISPgpvn', { action: 'submit' })
                .then(function(token) {
                    $('.recaptchaResponse').val(token);
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'ajax/',
                        data: $(form).serialize() + '&parent_url=' + window.parent.location.href,
                        dataType: 'json',
                        success: function (response) {
                            if (response.status == 'success') {
                                form.reset();
                                $('#queries_form').hide();
                                $('#form_response').html('<p style="font-size: 17px; font-weight: 600;" class="text-white">Thanks for your interest in GIFT IFI Programmes. Someone from our office will get back to you soon.</p>');
                            } else if (response.status == 'brochure') {
                               form.reset();
                               $('#brochure_form').hide();
                               $('#brochure_form_response').html('<p style="font-size: 17px; font-weight: 600;" class="text-success">Thanks for your interest in GIFT IFI Programmes. Someone from our office will get back to you soon.</p>');
                               var modifiedUrl = base_url.replace(/^\/+/, '');
                               var live_file_path = $("#brochure_url_link").val();
                               var live_file_path_name = live_file_path?.split("/").reverse()[0];
                               var filePath = live_file_path?.length > 0 ? live_file_path : modifiedUrl + 'site/assets/pdf/GIFTIFI-Brochure-May2025.pdf';
                               var link = $('<a>', {
                                href: filePath,
                                download: live_file_path_name?.length > 0 ? live_file_path_name : 'GIFTIFI-Brochure-May2025.pdf',
                                style: 'display:none'  
                            });
                               $('body').append(link);
                               link[0].click();  
                               link.remove();
                           } else {
                            $('#form_response').prepend('<p style="font-size: 17px; font-weight: 600;" class="text-danger">There was some problem, please try again after sometime.</p>');
                        }
                    },
                    error: function(xhr, status, error) {
                        $('#form_response').prepend('<p style="font-size: 17px; font-weight: 600;" class="text-danger">There was an error with the form submission. Please try again later.</p>');
                    }
                });
                })
                .catch(function(error) {
                    $('#form_response').prepend('<p style="font-size: 17px; font-weight: 600;" class="text-danger">reCAPTCHA verification failed. Please try again.</p>');
                });
            }
        });
});

 $(".fintech-queries-form").each(function () {
         $(this).validate({
            errorElement: 'div',
            errorClass: 'error_form',
            onkeyup: false,
            rules: {
                first_name: {
                    required: true,
                    noSpaces: true
                },
                last_name: {
                    required: true,
                    noSpaces: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    digits: true,
                    minlength: 10
                },
                interest: {
                    required: true
                },
                organization: {
                    required: true,
                },
                city: {
                    required: true,
                    noSpaces: true
                }
            },
            messages: {
                first_name: {
                    required: "Please enter your first name.",
                    noSpaces: "Spaces are not allowed in the first name."
                },
                last_name: {
                    required: "Please enter your last name.",
                    noSpaces: "Spaces are not allowed in the last name."
                },
                email: {
                    required: "Please enter a valid email address.",
                    email: "Please enter a valid email.",
                    noSpaces: "Spaces are not allowed in the email address."
                },
                phone: {
                    required: "Please enter your phone number.",
                    digits: "Please enter a valid phone number.",
                    minlength: "Your phone number must be at least 10 digits."
                },
                interest: {
                    required: "Please select an interest."
                },
                organization: {
                    required: "Please enter your organization name.",
                },
                city: {
                    required: "Please enter a city.",
                    noSpaces: "Spaces are not allowed in the city name."
                }
            },
            errorPlacement: function (error, element)
            {
                error.insertAfter(element);
            },
            highlight: function(element) {
                $(element).addClass("is-invalid");
            },
            unhighlight: function(element) {
                $(element).removeClass("is-invalid");
            },
            submitHandler: function (form) {
                
                let flagValue = $(form).find('input[name="flag"]').val();
                
                if (flagValue == "brochure") {
                  let submitButton = $(".download-brochure-button");
                  submitButton.prop("disabled", true);
                  submitButton.html(
                    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...'
                  );
                } else if (flagValue == "querie") {
                  let submitButton = $(".download-querie-button");
                  submitButton.prop("disabled", true);
                  submitButton.html(
                    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...'
                  );
                }
                
                if (typeof grecaptcha === 'undefined') {
                    console.error("reCAPTCHA CDN not found or not loaded.");
                    $('#form_response').prepend('<p style="font-size: 17px; font-weight: 600;" class="text-danger">There was some problem, please try again after sometime.</p>');
                    return; 
                }
                grecaptcha.enterprise.execute('6LfoRqAqAAAAAK3G1RcmDp09XV0y9b1P-ISPgpvn', { action: 'submit' })
                .then(function(token) {
                    $('.recaptchaResponse').val(token);
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'ajax/',
                        data: $(form).serialize() + '&parent_url=' + window.parent.location.href,
                        dataType: 'json',
                        success: function (response) {
                            if (response.status == 'success') {
                                form.reset();
                                $('#fintech_queries_form').hide();
                                $('#form_response').html('<p style="font-size: 17px; font-weight: 600;" class="text-white">Thanks for your interest in Fintech Foundations Program. Someone from our office will get back to you soon.</p>');
                            } else if (response.status == 'brochure') {
                               form.reset();
                               $('#brochure_form').hide();
                               $('#brochure_form_response').html('<p style="font-size: 17px; font-weight: 600;" class="text-success">Thanks for your interest in Fintech Foundations Program. Someone from our office will get back to you soon.</p>');
                               var modifiedUrl = base_url.replace(/^\/+/, '');
                               var filePath = modifiedUrl + 'site/assets/pdf/GIFTIFI-Brochure-May2025.pdf';
                               var link = $('<a>', {
                                href: filePath,
                                download: 'GIFTIFI-Brochure-May2025.pdf',
                                style: 'display:none'  
                            });
                               $('body').append(link);
                               link[0].click();  
                               link.remove();
                           } else {
                            $('#form_response').prepend('<p style="font-size: 17px; font-weight: 600;" class="text-danger">There was some problem, please try again after sometime.</p>');
                        }
                    },
                    error: function(xhr, status, error) {
                        $('#form_response').prepend('<p style="font-size: 17px; font-weight: 600;" class="text-danger">There was an error with the form submission. Please try again later.</p>');
                    }
                });
                })
                .catch(function(error) {
                    $('#form_response').prepend('<p style="font-size: 17px; font-weight: 600;" class="text-danger">reCAPTCHA verification failed. Please try again.</p>');
                });
            }
        });
});

      

   $('#submitemail').click(function() {
    var email = $('#Email').val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    $('#form_error').hide();
    if (email && emailRegex.test(email)) {
        $.ajax({
            type: 'POST',
            url: base_url + 'ajax/',
            data: {
                email: email,
                action: 'add_email'
            },
            dataType: 'json',
            success: function(response) {
                console.log(response.status);
                if (response.status == 'success') {
                    $('#footer-form-block').hide();
                    $('#email_form_response').html('<p style="font-size: 26px; font-weight: 900; line-height: 1.2;" class="text-success">You have successfully subscribed, thank you.</p>');
                    $('#Email').val('');
                } else {
                    $('#footer-form-block').hide();
                    $('#email_form_response').prepend('<p style="font-size: 26px; font-weight: 900; line-height: 1.2;" class="text-danger">There was some problem, please try again after sometime.</p>');
                }
            },
            error: function(xhr, status, error) {
                $('#footer-form-block').hide();
                $('#email_form_response').prepend('<p style="font-size: 26px; font-weight: 900; line-height: 1.2;" class="text-danger">There was an error with the form submission. Please try again later.</p>');
            }
        });
    } else {
        $('#form_error').show();
    }
});
});
