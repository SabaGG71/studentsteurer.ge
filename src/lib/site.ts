// The brand name is written once here: the logo, the page title and the header all read it.
export const site = {
  // The wordmark is set in two weights: `student` + `steurer`.
  nameStart: "student",
  nameEnd: "steurer",
  tld: ".ge",
  domain: "studentsteurer.ge",
};

export const navLinks = [
  { label: "სერვისები", href: "/services" },
  { label: "როგორ მუშაობს", href: "/#how" },
  { label: "ჩვენს შესახებ", href: "/about" },
  { label: "ბლოგი", href: "/blog" },
  { label: "კონტაქტი", href: "/contact" },
];

export const cta = { label: "შეამოწმე თანხა", href: "/contact" };

// The languages offered in the header: the short name on the button, the full name in its own language, and what
// the language is called in the other one. Only the Georgian site exists so far, so for now the switch just shows
// the choice and changes nothing else.
export const languages = [
  { code: "ka", short: "ქარ", name: "ქართული", note: "Georgisch" },
  { code: "de", short: "Deu", name: "Deutsch", note: "გერმანული" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];
