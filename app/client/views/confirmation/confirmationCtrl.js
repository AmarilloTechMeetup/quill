angular.module('reg')
  .controller('ConfirmationCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'currentUser',
    'Utils',
    'UserService',
    function ($scope, $rootScope, $state, currentUser, Utils, UserService) {

      // Set up the user
      var user = currentUser.data;
      $scope.user = user;

      $scope.pastConfirmation = Date.now() > user.status.confirmBy;

      $scope.formatTime = Utils.formatTime;

      _setupForm();

      $scope.fileName = user._id + "_" + user.profile.name.split(" ").join("_");

      // -------------------------------
      // All this just for dietary restriction checkboxes fml

      var dietaryRestrictions = {
        'Vegetarian': false,
        'Vegan': false,
        'Halal': false,
        'Kosher': false,
        'Nut Allergy': false,
        'Other': false
      };

      if (user.confirmation.dietaryRestrictions) {
        user.confirmation.dietaryRestrictions.forEach(function (restriction) {
          if (restriction in dietaryRestrictions) {
            dietaryRestrictions[restriction] = true;
          }
        });
      }

      $scope.dietaryRestrictions = dietaryRestrictions;

      // -------------------------------

      function _updateUser(e) {
        var confirmation = $scope.user.confirmation;
        // Get the dietary restrictions as an array
        var drs = [];
        Object.keys($scope.dietaryRestrictions).forEach(function (key) {
          if ($scope.dietaryRestrictions[key]) {
            drs.push(key);
          }
        });
        confirmation.dietaryRestrictions = drs;

        UserService
          .updateConfirmation(user._id, confirmation)
          .success(function (data) {
            sweetAlert({
              title: "Woo!",
              text: "You're confirmed!",
              type: "success",
              confirmButtonColor: "#e76482"
            }, function () {
              $state.go('app.dashboard');
            });
          })
          .error(function (res) {
            sweetAlert("Uh oh!", "Something went wrong.", "error");
          });
      }

      function getBirthday() {
        return $scope.user.confirmation.birthday;
      }

      function hasParentLiabilityWaiverSignature() {
        let sig = $scope.user.confirmation.signatureLiabilityParent;
        return (sig ? true : false);
      }

      function hasParentPhotoReleaseSignature() {
        let sig = $scope.user.confirmation.signaturePhotoReleaseParent;
        return (sig ? true : false);
      }

      function checkAge(value, age) {
        if (moment(value, "DD/MM/YYYY").isBefore(moment().subtract(parseInt(age, 10), "year"))) {
          return true;
        } else {
          return false;
        }
      }

      function _setupForm() {

        // Here's hoping age validation works
        $.fn.form.settings.rules.age = checkAge;

        // Additional check based on age and LW parent signature
        $.fn.form.settings.rules.needParentSignatureForLiabilityWaiver = function (value) {
          let dateOfBirth = getBirthday();
          let isUnder18 = !checkAge(dateOfBirth, 18);
          if (isUnder18) {
            if (hasParentLiabilityWaiverSignature()) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }

        // Additional check based on age and PR parent signature
        $.fn.form.settings.rules.needParentSignatureForPhotoRelease = function (value) {
          let dateOfBirth = getBirthday();
          let isUnder18 = !checkAge(dateOfBirth, 18);
          if (isUnder18) {
            if (hasParentPhotoReleaseSignature()) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }

        // Semantic-UI form validation
        $('.ui.form').form({
          inline: true,
          fields: {
            shirt: {
              identifier: 'shirt',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please give us a shirt size!'
                }
              ]
            },
            phone: {
              identifier: 'phone',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter a phone number.'
                }
              ]
            },
            birthday: {
              identifier: 'birthday',
              rules: [
                {
                  type: 'age[16]',
                  prompt: 'You have to be at least 16 years of age to participate.  Sorry.'
                }
              ]
            },
            signatureLiability: {
              identifier: 'signatureLiabilityWaiver',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please type your digital signature.'
                }
              ]
            },
            signaturePhotoRelease: {
              identifier: 'signaturePhotoRelease',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please type your digital signature.'
                }
              ]
            },
            signatureLiabilityParent: {
              identifier: 'signatureLiabilityWaiverParent',
              rules: [
                {
                  type: 'needParentSignatureForLiabilityWaiver',
                  prompt: 'You are under 18 years of age, so have your parent/guardian type this.'
                }
              ]
            },
            signaturePhotoReleaseParent: {
              identifier: 'signaturePhotoReleaseParent',
              rules: [
                {
                  type: 'needParentSignatureForPhotoRelease',
                  prompt: 'You are under 18 years of age, so have your parent/guardian type this.'
                }
              ]
            },
            signatureCodeOfConduct: {
              identifier: 'signatureCodeOfConduct',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please type your digital signature.'
                }
              ]
            },
          }
        });
      }

      $scope.submitForm = function () {
        if ($('.ui.form').form('is valid')) {
          _updateUser();
        }
      };

    }]);