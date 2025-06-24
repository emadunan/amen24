import "dotenv/config";

export default {
  "expo": {
    "name": "Amen24",
    "slug": "amen24",
    "version": "1.0.1",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "amen24",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "updates": {
      "enabled": true,
      "checkAutomatically": "ON_LOAD",
      "fallbackToCacheTimeout": 0
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "yeshua.emadunan.amen24"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#F4EFE6"
      },
      "package": "yeshua.emadunan.amen24"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#F4EFE6"
        }
      ],
      [
        "expo-sqlite",
        {
          "enableFTS": true,
          "useSQLCipher": true,
          "android": {
            "enableFTS": false,
            "useSQLCipher": false
          },
          "ios": {
            "customBuildFlags": [
              "-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1"
            ]
          }
        }
      ],
      "expo-font",
      "expo-localization",
      "expo-secure-store"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "c197183c-5985-4300-a147-d737a73a267f"
      },
      API_URL: process.env.API_URL
    }
  }
}
