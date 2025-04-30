'use client'

import { useEffect } from 'react'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import * as CookieConsent from 'vanilla-cookieconsent'

export default function CookieConsentComponent() {
  useEffect(() => {
    console.log('CookieConsent component mounting...');
    
    try {
      CookieConsent.run({
        autoShow: true,  // Force the modal to show
        mode: 'opt-in',  // Make sure consent is required
        disablePageInteraction: false,  // Don't block page interaction

        guiOptions: {
          consentModal: {
            layout: 'box',
            position: 'bottom right',
            equalWeightButtons: true,
            flipButtons: false
          },
          preferencesModal: {
            layout: 'box',
            position: 'right',
            equalWeightButtons: true,
            flipButtons: false
          }
        },
        categories: {
          necessary: {
            enabled: true,
            readOnly: true
          },
          analytics: {
            enabled: false,
            readOnly: false,
            autoClear: {
              cookies: [
                { name: /^_ga/ },
                { name: '_gid' }
              ]
            }
          }
        },
        language: {
          default: 'en',
          translations: {
            en: {
              consentModal: {
                title: 'Cookie Preferences',
                description: '<p style="color: #F8F5F0; font-size: 1rem;">We use cookies to enhance your experience and analyze our website traffic.</p>',
                acceptAllBtn: '<button style="color: #1E1E1E; padding: 0.5rem 1rem; outline: none; box-shadow: none; font-weight: bold;">Accept All</button>',
                acceptNecessaryBtn: '<button style="color: #1E1E1E; padding: 0.5rem 1rem; outline: none; box-shadow: none; font-weight: bold;">Only Necessary</button>',
                showPreferencesBtn: '<button style="color: #F8F5F0; padding: 0.5rem 1rem; outline: none; box-shadow: none; font-weight: bold;">Customize</button>'
              },
              preferencesModal: {
                title: 'Privacy Preferences',
                acceptAllBtn: '<button style="color: #1E1E1E; padding: 0.5rem 1rem; outline: none; box-shadow: none; font-weight: bold;">Accept All</button>',
                acceptNecessaryBtn: '<button style="color: #1E1E1E; padding: 0.5rem 1rem; outline: none; box-shadow: none; font-weight: bold;">Only Necessary</button>',
                savePreferencesBtn: '<button style="color: #F8F5F0; padding: 0.5rem 1rem; outline: none; box-shadow: none; font-weight: bold;">Save Preferences</button>',
                closeIconLabel: 'Close',
                sections: [
                  {
                    title: '<div style="color: #1E1E1E; font-size: 1rem;">Essential Cookies</div>',
                    description: '<p style="color: #F8F5F0; font-size: 1rem;">Required for basic site functionality.</p>',
                    linkedCategory: 'necessary'
                  },
                  {
                    title: '<div style="color: #1E1E1E; font-size: 1rem;">Analytics</div>',
                    description: '<p style="color: #F8F5F0; font-size: 1rem;">Help us improve our website through anonymous usage data.</p>',
                    linkedCategory: 'analytics'
                  }
                ]
              }
            }
          }
        },
        onFirstConsent: ({cookie}) => {
          console.log('First consent given:', cookie);
        },
        onConsent: ({cookie}) => {
          console.log('Consent updated:', cookie);
        },
        onModalReady: ({modalName}) => {
          console.log('Modal ready:', modalName);
        },
        onModalShow: ({modalName}) => {
          console.log('Modal shown:', modalName);
        },
        onModalHide: ({modalName}) => {
          console.log('Modal hidden:', modalName);
        }
      });

      console.log('CookieConsent initialized successfully');
    } catch (error) {
      console.error('Error initializing CookieConsent:', error);
    }

    return () => {
      // Cleanup if needed
      console.log('CookieConsent component unmounting...');
    };
  }, []);

  return null; // The cookie consent UI is injected automatically
} 