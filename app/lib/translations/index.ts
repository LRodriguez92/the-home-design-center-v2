import { en } from './en'
import { es } from './es'

export type Language = 'en' | 'es'
export type TranslationsType = typeof en
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

const translations: Record<Language, TranslationsType> = {
  en,
  es,
}

export type TranslationKey = NestedKeyOf<typeof en>

export function getTranslation(lang: Language, key: TranslationKey) {
  const keys = key.split('.') as (keyof TranslationsType)[]
  let current: unknown = translations[lang]
  
  for (const k of keys) {
    if (typeof current !== 'object' || current === null || !(k in (current as object))) {
      console.warn(`Translation missing for key: ${key} in language: ${lang}`)
      return key
    }
    current = (current as Record<string, unknown>)[k]
  }
  
  return current as string
}

export function useTranslations(lang: Language) {
  return {
    t: (key: TranslationKey) => getTranslation(lang, key),
  }
} 