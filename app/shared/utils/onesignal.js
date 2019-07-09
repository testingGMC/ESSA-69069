import { getUserId } from './access-token'
import { ONESIGNAL_APPID } from '../constants'

export const register = () => {
  const OneSignal = window.OneSignal || []
  OneSignal.push(function() {
    OneSignal.init({
      appId: ONESIGNAL_APPID,
      notifyButton: {
        enable: true,
        autoResubscribe: true,
        autoRegister: true,
        displayPredicate() {
          return OneSignal.isPushNotificationsEnabled().then(function(
            isPushEnabled,
          ) {
            if (isPushEnabled) {
              OneSignal.sendTags({
                userId: getUserId(),
              })
            }
            return !isPushEnabled
          })
        },
      },
    })
  })
}
export const registerPushNotification = () => {
  register()
}
