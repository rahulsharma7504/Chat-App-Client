[33mcommit 8fd531098414166c5c846ab55f61ed200b9081c9[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m)[m
Author: Rahul Sharma <rahul658541@gmail.com>
Date:   Sun Aug 11 20:53:00 2024 +0530

    Upload project

[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex d6abf18..2493b2d 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -8,12 +8,23 @@[m
       "name": "chat",[m
       "version": "0.1.0",[m
       "dependencies": {[m
[32m+[m[32m        "@chakra-ui/react": "^2.8.2",[m
[32m+[m[32m        "@emotion/react": "^11.13.0",[m
[32m+[m[32m        "@emotion/styled": "^11.13.0",[m
         "@testing-library/jest-dom": "^5.17.0",[m
         "@testing-library/react": "^13.4.0",[m
         "@testing-library/user-event": "^13.5.0",[m
[32m+[m[32m        "axios": "^1.7.2",[m
[32m+[m[32m        "framer-motion": "^11.3.19",[m
[32m+[m[32m        "moment": "^2.30.1",[m
         "react": "^18.3.1",[m
         "react-dom": "^18.3.1",[m
[32m+[m[32m        "react-icons": "^5.2.1",[m
[32m+[m[32m        "react-router-dom": "^6.24.1",[m
         "react-scripts": "5.0.1",[m
[32m+[m[32m        "react-toastify": "^10.0.5",[m
[32m+[m[32m        "socket.io-client": "^4.7.5",[m
[32m+[m[32m        "sweetalert2": "^11.12.4",[m
         "web-vitals": "^2.1.4"[m
       }[m
     },[m
[36m@@ -2029,6 +2040,1166 @@[m
       "resolved": "https://registry.npmjs.org/@bcoe/v8-coverage/-/v8-coverage-0.2.3.tgz",[m
       "integrity": "sha512-0hYQ8SB4Db5zvZB4axdMHGwEaQjkZzFjQiN9LVYvIFB2nSUHW9tYpxWriPrWDASIxiaXax83REcLxuSdnGPZtw=="[m
     },[m
[32m+[m[32m    "node_modules/@chakra-ui/accordion": {[m
[32m+[m[32m      "version": "2.3.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/accordion/-/accordion-2.3.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-FSXRm8iClFyU+gVaXisOSEw0/4Q+qZbFRiuhIAkVU6Boj0FxAMrlo9a8AV5TuF77rgaHytCdHk0Ng+cyUijrag==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/descendant": "3.1.0",[m
[32m+[m[32m        "@chakra-ui/icon": "3.2.0",[m
[32m+[m[32m        "@chakra-ui/react-context": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-controllable-state": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-merge-refs": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5",[m
[32m+[m[32m        "@chakra-ui/transition": "2.1.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@chakra-ui/system": ">=2.0.0",[m
[32m+[m[32m        "framer-motion": ">=4.0.0",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/alert": {[m
[32m+[m[32m      "version": "2.2.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/alert/-/alert-2.2.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-jHg4LYMRNOJH830ViLuicjb3F+v6iriE/2G5T+Sd0Hna04nukNJ1MxUmBPE+vI22me2dIflfelu2v9wdB6Pojw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/icon": "3.2.0",[m
[32m+[m[32m        "@chakra-ui/react-context": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5",[m
[32m+[m[32m        "@chakra-ui/spinner": "2.1.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@chakra-ui/system": ">=2.0.0",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/anatomy": {[m
[32m+[m[32m      "version": "2.2.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/anatomy/-/anatomy-2.2.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-MV6D4VLRIHr4PkW4zMyqfrNS1mPlCTiCXwvYGtDFQYr+xHFfonhAuf9WjsSc0nyp2m0OdkSLnzmVKkZFLo25Tg=="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/avatar": {[m
[32m+[m[32m      "version": "2.3.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/avatar/-/avatar-2.3.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-8gKSyLfygnaotbJbDMHDiJoF38OHXUYVme4gGxZ1fLnQEdPVEaIWfH+NndIjOM0z8S+YEFnT9KyGMUtvPrBk3g==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/image": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-children-utils": "2.0.6",[m
[32m+[m[32m        "@chakra-ui/react-context": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@chakra-ui/system": ">=2.0.0",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/breadcrumb": {[m
[32m+[m[32m      "version": "2.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/breadcrumb/-/breadcrumb-2.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-4cWCG24flYBxjruRi4RJREWTGF74L/KzI2CognAW/d/zWR0CjiScuJhf37Am3LFbCySP6WSoyBOtTIoTA4yLEA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/react-children-utils": "2.0.6",[m
[32m+[m[32m        "@chakra-ui/react-context": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@chakra-ui/system": ">=2.0.0",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/breakpoint-utils": {[m
[32m+[m[32m      "version": "2.0.8",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/breakpoint-utils/-/breakpoint-utils-2.0.8.tgz",[m
[32m+[m[32m      "integrity": "sha512-Pq32MlEX9fwb5j5xx8s18zJMARNHlQZH2VH1RZgfgRDpp7DcEgtRW5AInfN5CfqdHLO1dGxA7I3MqEuL5JnIsA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/button": {[m
[32m+[m[32m      "version": "2.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/button/-/button-2.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-95CplwlRKmmUXkdEp/21VkEWgnwcx2TOBG6NfYlsuLBDHSLlo5FKIiE2oSi4zXc4TLcopGcWPNcm/NDaSC5pvA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/react-context": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-merge-refs": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5",[m
[32m+[m[32m        "@chakra-ui/spinner": "2.1.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@chakra-ui/system": ">=2.0.0",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/card": {[m
[32m+[m[32m      "version": "2.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/card/-/card-2.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-xUB/k5MURj4CtPAhdSoXZidUbm8j3hci9vnc+eZJVDqhDOShNlD6QeniQNRPRys4lWAQLCbFcrwL29C8naDi6g==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@chakra-ui/system": ">=2.0.0",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/checkbox": {[m
[32m+[m[32m      "version": "2.3.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/checkbox/-/checkbox-2.3.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-85g38JIXMEv6M+AcyIGLh7igNtfpAN6KGQFYxY9tBj0eWvWk4NKQxvqqyVta0bSAyIl1rixNIIezNpNWk2iO4g==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/form-control": "2.2.0",[m
[32m+[m[32m        "@chakra-ui/react-context": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-types": "2.0.7",[m
[32m+[m[32m        "@chakra-ui/react-use-callback-ref": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-controllable-state": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-merge-refs": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-safe-layout-effect": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-update-effect": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5",[m
[32m+[m[32m        "@chakra-ui/visually-hidden": "2.2.0",[m
[32m+[m[32m        "@zag-js/focus-visible": "0.16.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@chakra-ui/system": ">=2.0.0",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/clickable": {[m
[32m+[m[32m      "version": "2.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/clickable/-/clickable-2.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-flRA/ClPUGPYabu+/GLREZVZr9j2uyyazCAUHAdrTUEdDYCr31SVGhgh7dgKdtq23bOvAQJpIJjw/0Bs0WvbXw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/react-use-merge-refs": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/close-button": {[m
[32m+[m[32m      "version": "2.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/close-button/-/close-button-2.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-gnpENKOanKexswSVpVz7ojZEALl2x5qjLYNqSQGbxz+aP9sOXPfUS56ebyBrre7T7exuWGiFeRwnM0oVeGPaiw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/icon": "3.2.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@chakra-ui/system": ">=2.0.0",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/color-mode": {[m
[32m+[m[32m      "version": "2.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/color-mode/-/color-mode-2.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-niTEA8PALtMWRI9wJ4LL0CSBDo8NBfLNp4GD6/0hstcm3IlbBHTVKxN6HwSaoNYfphDQLxCjT4yG+0BJA5tFpg==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/react-use-safe-layout-effect": "2.1.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/control-box": {[m
[32m+[m[32m      "version": "2.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/control-box/-/control-box-2.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-gVrRDyXFdMd8E7rulL0SKeoljkLQiPITFnsyMO8EFHNZ+AHt5wK4LIguYVEq88APqAGZGfHFWXr79RYrNiE3Mg==",[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@chakra-ui/system": ">=2.0.0",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/counter": {[m
[32m+[m[32m      "version": "2.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/counter/-/counter-2.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-s6hZAEcWT5zzjNz2JIWUBzRubo9la/oof1W7EKZVVfPYHERnl5e16FmBC79Yfq8p09LQ+aqFKm/etYoJMMgghw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/number-utils": "2.0.7",[m
[32m+[m[32m        "@chakra-ui/react-use-callback-ref": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/css-reset": {[m
[32m+[m[32m      "version": "2.3.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/css-reset/-/css-reset-2.3.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-cQwwBy5O0jzvl0K7PLTLgp8ijqLPKyuEMiDXwYzl95seD3AoeuoCLyzZcJtVqaUZ573PiBdAbY/IlZcwDOItWg==",[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@emotion/react": ">=10.0.35",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/descendant": {[m
[32m+[m[32m      "version": "3.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/descendant/-/descendant-3.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-VxCIAir08g5w27klLyi7PVo8BxhW4tgU/lxQyujkmi4zx7hT9ZdrcQLAted/dAa+aSIZ14S1oV0Q9lGjsAdxUQ==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/react-context": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-merge-refs": "2.1.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/dom-utils": {[m
[32m+[m[32m      "version": "2.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/dom-utils/-/dom-utils-2.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-ZmF2qRa1QZ0CMLU8M1zCfmw29DmPNtfjR9iTo74U5FPr3i1aoAh7fbJ4qAlZ197Xw9eAW28tvzQuoVWeL5C7fQ=="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/editable": {[m
[32m+[m[32m      "version": "3.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/editable/-/editable-3.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-j2JLrUL9wgg4YA6jLlbU88370eCRyor7DZQD9lzpY95tSOXpTljeg3uF9eOmDnCs6fxp3zDWIfkgMm/ExhcGTg==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/react-context": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-types": "2.0.7",[m
[32m+[m[32m        "@chakra-ui/react-use-callback-ref": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-controllable-state": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-focus-on-pointer-down": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-merge-refs": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-safe-layout-effect": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/react-use-update-effect": "2.1.0",[m
[32m+[m[32m        "@chakra-ui/shared-utils": "2.0.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@chakra-ui/system": ">=2.0.0",[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/event-utils": {[m
[32m+[m[32m      "version": "2.0.8",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/event-utils/-/event-utils-2.0.8.tgz",[m
[32m+[m[32m      "integrity": "sha512-IGM/yGUHS+8TOQrZGpAKOJl/xGBrmRYJrmbHfUE7zrG3PpQyXvbLDP1M+RggkCFVgHlJi2wpYIf0QtQlU0XZfw=="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/focus-lock": {[m
[32m+[m[32m      "version": "2.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/focus-lock/-/focus-lock-2.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-EmGx4PhWGjm4dpjRqM4Aa+rCWBxP+Rq8Uc/nAVnD4YVqkEhBkrPTpui2lnjsuxqNaZ24fIAZ10cF1hlpemte/w==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@chakra-ui/dom-utils": "2.1.0",[m
[32m+[m[32m        "react-focus-lock": "^2.9.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "react": ">=18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@chakra-ui/form-control": {[m
[32m+[m[32m      "version": "2.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@chakra-ui/form-control/-/form-control-2.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-wehLC1t4fafCVJ2RvJQT2jyqsAwX7KymmiGqBu7nQoQz8ApTkGABWpo/QwDh3F/dBLrouHDoOvGmYTqft3Mirw==",[m
[32m+[m[32m      "