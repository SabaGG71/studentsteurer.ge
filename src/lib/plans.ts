// PLACEHOLDERS. The plans' names, their prices and what each includes are samples made up for the design: the
// client has not given us the real offer yet. Replace all of it before the site goes live. The pricing cards and
// the comparison table are both drawn from this one file.
//
// `price: null` is a plan without a fixed price. `lead` heads a plan's own list on its card. `art` picks the small
// key drawn in the card's corner (how-art).
export const PLANS = [
  { name: "საბაზისო", text: "ერთი წლის დეკლარაცია, თავიდან ბოლომდე.", price: "99", lead: "რა შედის", cta: "დაწყება", art: 0, featured: false },
  { name: "სრული", text: "ერთი წელი, ჩვენი თანხლებით ბოლომდე.", price: "149", lead: "ყველაფერი საბაზისოდან, და", cta: "დაწყება", art: 1, featured: true },
  { name: "რამდენიმე წელი", text: "თუ გერმანიაში ერთზე მეტ წელს იმუშავე.", price: null, lead: "ყველაფერი სრულიდან, და", cta: "მოგვწერე", art: 2, featured: false },
];

// What the plans include. The plans build on one another, so each line only says from which plan on it is included
// (`from`, the plan's place in PLANS): a card lists the lines that start with its plan, the table shows them all.
export const FEATURES = [
  { label: "დოკუმენტების შემოწმება", from: 0 },
  { label: "დეკლარაციის მომზადება", from: 0 },
  { label: "გაგზავნა Finanzamt-ში", from: 0 },
  { label: "Finanzamt-თან მიმოწერა", from: 1 },
  { label: "Steuerbescheid-ის შემოწმება", from: 1 },
  { label: "დახმარება დოკუმენტების მოძიებაში", from: 1 },
  { label: "ორი და მეტი წლის დეკლარაცია", from: 2 },
  { label: "თითოეული წელი ცალკე გათვლით", from: 2 },
  { label: "ერთი საერთო ფასი", from: 2 },
];

// How a plan's price reads in one line.
export const priceOf = (price: string | null) => (price ? `${price} ₾` : "შეთანხმებით");
