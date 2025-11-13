'use client'

import { useEffect } from 'react'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import * as CookieConsent from 'vanilla-cookieconsent'

export default function CookieConsentComponent() {
  useEffect(() => {
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
          // Sync consent to localStorage for Google Analytics
          // cookie.categories is an array of accepted category names
          const analyticsEnabled = Array.isArray(cookie.categories) && cookie.categories.includes('analytics');
          localStorage.setItem('cookieConsent', JSON.stringify({ analytics: analyticsEnabled }));
          window.dispatchEvent(new Event('cookie_consent_update'));
        },
        onConsent: ({cookie}) => {
          // Sync consent to localStorage for Google Analytics
          // cookie.categories is an array of accepted category names
          const analyticsEnabled = Array.isArray(cookie.categories) && cookie.categories.includes('analytics');
          localStorage.setItem('cookieConsent', JSON.stringify({ analytics: analyticsEnabled }));
          window.dispatchEvent(new Event('cookie_consent_update'));
        },
        onModalReady: () => {
          // Modal is ready
        },
        onModalShow: () => {
          // Modal is shown
        },
        onModalHide: () => {
          // Modal is hidden
        }
      });

      // After initialization, check if consent already exists and sync it
      // This handles the case where user refreshes after accepting consent
      setTimeout(() => {
        try {
          // Try to read consent from the cookie consent library's cookie
          // vanilla-cookieconsent typically stores in a cookie named 'cc_cookie'
          const consentCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('cc_cookie='));
          
          if (consentCookie) {
            const cookieValue = decodeURIComponent(consentCookie.split('=')[1]);
            try {
              const parsed = JSON.parse(cookieValue);
              if (parsed && Array.isArray(parsed.categories)) {
                const analyticsEnabled = parsed.categories.includes('analytics');
                localStorage.setItem('cookieConsent', JSON.stringify({ analytics: analyticsEnabled }));
                window.dispatchEvent(new Event('cookie_consent_update'));
              }
            } catch {
              // Cookie exists but format is different, that's okay
            }
          }
        } catch {
          // If we can't read existing consent, that's okay - it will sync on next consent action
        }
      }, 500);
    } catch (error) {
      console.error('Error initializing CookieConsent:', error);
    }

    return () => {};
  }, []);

  return null; // The cookie consent UI is injected automatically
} 