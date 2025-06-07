export enum Denomination {
  NonDenominational = 'non-denominational',
  Catholic = 'catholic',
  Orthodox = 'orthodox',
  Protestant = 'protestant',
  Evangelical = 'evangelical',
  Anglican = 'anglican',
  Other = 'other',
}

export enum Church {
  // Orthodox
  CopticOrthodox = 'coptic-orthodox',
  EasternOrthodox = 'eastern-orthodox',
  RussianOrthodox = 'russian-orthodox',
  GreekOrthodox = 'greek-orthodox',

  // Catholic
  RomanCatholic = 'roman-catholic',
  EasternCatholic = 'eastern-catholic',

  // Protestant
  Lutheran = 'lutheran',
  Reformed = 'reformed',
  Methodist = 'methodist',
  Baptist = 'baptist',

  // Evangelical
  EvangelicalFree = 'evangelical-free',
  Pentecostal = 'pentecostal',
  Charismatic = 'charismatic',

  // Anglican
  AnglicanCommunion = 'anglican-communion',
  Episcopal = 'episcopal',

  // Non-Denominational / Other
  NonDenominational = 'non-denominational',
  Other = 'other',
}

export const ChurchToDenomination: Record<Church, Denomination> = {
  // Orthodox
  [Church.CopticOrthodox]: Denomination.Orthodox,
  [Church.EasternOrthodox]: Denomination.Orthodox,
  [Church.RussianOrthodox]: Denomination.Orthodox,
  [Church.GreekOrthodox]: Denomination.Orthodox,

  // Catholic
  [Church.RomanCatholic]: Denomination.Catholic,
  [Church.EasternCatholic]: Denomination.Catholic,

  // Protestant
  [Church.Lutheran]: Denomination.Protestant,
  [Church.Reformed]: Denomination.Protestant,
  [Church.Methodist]: Denomination.Protestant,
  [Church.Baptist]: Denomination.Protestant,

  // Evangelical
  [Church.EvangelicalFree]: Denomination.Evangelical,
  [Church.Pentecostal]: Denomination.Evangelical,
  [Church.Charismatic]: Denomination.Evangelical,

  // Anglican
  [Church.AnglicanCommunion]: Denomination.Anglican,
  [Church.Episcopal]: Denomination.Anglican,

  // Non-Denominational / Other
  [Church.NonDenominational]: Denomination.NonDenominational,
  [Church.Other]: Denomination.Other,
};
