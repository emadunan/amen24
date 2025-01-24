import React from 'react'
import { Pressable } from 'react-native'
import { IconSymbol } from '../ui/IconSymbol'
import i18n from '@/i18n/i18n'

const LocaleSelector = () => {

  function handleLocale() {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';

    i18n.changeLanguage(newLanguage);
  }

  return (
    <Pressable onPress={handleLocale}>
      <IconSymbol size={28} name="language" color={"#fff"} />
    </Pressable>
  )
}

export default LocaleSelector