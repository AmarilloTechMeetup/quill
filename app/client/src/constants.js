angular.module('reg')
    .constant('EVENT_INFO', {
        NAME: 'Yellowcity Hack-A-Thon',
    })
    .constant('DASHBOARD', {
        UNVERIFIED: 'You should have received an email asking you verify your email. Click the link in the email and you can start your application!',
        INCOMPLETE_TITLE: 'You still need to complete your application!',
        INCOMPLETE: 'If you do not complete your application before the [APP_DEADLINE], you will not be allowed to attend!',
        SUBMITTED_TITLE: 'Your application has been submitted!',
        SUBMITTED: 'Feel free to edit it at any time. Keep in mind that submitting an application does not guarantee that you can attend the hackathon: keep an eye out for an email stating that your application has been accepted.  Acceptance of your application means you can attend.\nHowever, once registration is closed, you will not be able to edit it any further.\nOnce again, you will be notified via email if your application is accepted!',
        CLOSED_AND_INCOMPLETE_TITLE: 'Unfortunately, registration has closed.',
        CLOSED_AND_INCOMPLETE: 'Because you have not completed your profile in time, you will not be eligible to attend.',
        //ADMITTED_AND_CAN_CONFIRM_TITLE: 'You must confirm by [CONFIRM_DEADLINE].',
        ADMITTED_AND_CAN_CONFIRM_TITLE: 'You must confirm your spot by the Confirmation Deadline in order to attend.',
        ADMITTED_AND_CANNOT_CONFIRM_TITLE: 'Your confirmation deadline of [CONFIRM_DEADLINE] has passed.',
        ADMITTED_AND_CANNOT_CONFIRM: 'Although you were accepted, you did not complete your confirmation in time.\nUnfortunately, this means that you will not be able to attend the event, as we must begin to accept other applicants on the waitlist.\nWe hope to see you again next year!',
        CONFIRMED_NOT_PAST_TITLE: 'You can edit your confirmation information until [CONFIRM_DEADLINE]',
        DECLINED: 'We\'re sorry to hear that you won\'t be able to make it to the Yellow City Hack-A-Thon! :(\nMaybe next year! We hope you see you again soon.',
    })
    .constant('TEAM',{
        NO_TEAM_REG_CLOSED: 'Unfortunately, it\'s too late to enter with a team.\nHowever, you can still form teams on your own before or during the event!',
    });
