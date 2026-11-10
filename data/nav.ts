import type { LinkItem, NavMenu } from "./types";

const CDN = "https://digitalassets.tesla.com/tesla-contents/image/upload";
const mega = (file: string) => `${CDN}/f_auto,q_auto,w_220,c_scale/dpr_2.0/${file}`;
const T = "https://www.tesla.com";

export const navMenus: NavMenu[] = [
  {
    kind: "cards",
    label: "Vehicles",
    cards: [
      { title: "Model 3", href: `${T}/model3`, image: mega("Mega-Menu-Vehicles-Model-3-APAC-LHD.jpg"), links: [{ label: "Learn", href: `${T}/model3` }, { label: "Order", href: `${T}/model3/design?cfg=$MT369` }] },
      { title: "Model Y", href: `${T}/modely`, image: mega("Mega-Menu-Vehicles-Model-Y-2-v3.jpg"), links: [{ label: "Learn", href: `${T}/modely` }, { label: "Order", href: `${T}/modely/design?cfg=$MTY83,$PN03` }] },
      { title: "Cybertruck", href: `${T}/cybertruck`, image: mega("Mega-Menu-Vehicles-Cybertruck-1x.png"), links: [{ label: "Learn", href: `${T}/cybertruck` }, { label: "Order", href: `${T}/cybertruck/design` }] },
      { title: "Roadster", href: `${T}/roadster`, image: mega("Mega-Menu-Roadster.jpg"), links: [{ label: "Learn", href: `${T}/roadster` }, { label: "Reserve", href: `${T}/roadster/reserve` }] },
      { title: "Full Self-Driving (Supervised)", href: `${T}/fsd`, image: mega("Mega-Menu-Vehicles-FSD.jpg"), links: [{ label: "Learn", href: `${T}/fsd` }, { label: "Experience", href: `${T}/drive` }] },
      { title: "Inventory", href: `${T}/new`, image: mega("Mega-Menu-Vehicles-Inventory-v3.png"), links: [{ label: "New", href: `${T}/new` }, { label: "Certified Pre-Owned", href: `${T}/used` }] },
    ],
    list: [
      { label: "Current Offers", href: `${T}/current-offers` },
      { label: "Demo Drive", href: `${T}/drive` },
      { label: "Trade-in", href: `${T}/tradein` },
      { label: "Vehicle Safety Report", href: `${T}/fsd/safety` },
      { label: "Certified Pre-Owned", href: `${T}/pre-owned` },
      { label: "Trip Planner", href: `${T}/trips` },
      { label: "Features", href: `${T}/features` },
      { label: "Help Me Choose", href: `${T}/choose` },
      { label: "Compare", href: `${T}/compare` },
      { label: "Safety", href: `${T}/safety` },
      { label: "Fleet", href: `${T}/fleet` },
      { label: "Model S", href: `${T}/models` },
      { label: "Model X", href: `${T}/modelx` },
    ],
  },
  {
    kind: "cards",
    label: "Energy",
    cards: [
      { title: "Solar Panels", href: `${T}/solarpanels`, image: mega("Mega-Menu-Energy-Solar-Panels.png"), links: [{ label: "Learn", href: `${T}/solarpanels` }, { label: "Order", href: `${T}/energy/design?poi=solarpanels` }] },
      { title: "Powerwall", href: `${T}/powerwall`, image: mega("Mega-Menu-Energy-Powerwall-US.png"), links: [{ label: "Learn", href: `${T}/powerwall` }, { label: "Order", href: `${T}/powerwall/design` }] },
      { title: "Megapack", href: `${T}/megapack`, image: mega("Mega-Menu-Energy-Megapack.png"), links: [{ label: "Learn", href: `${T}/megapack` }] },
    ],
    list: [
      { label: "Schedule a Consultation", href: `${T}/solar-virtual-consultations` },
      { label: "Tesla Home", href: `${T}/tesla-home` },
      { label: "Why Solar", href: `${T}/why-solar` },
      { label: "Incentives", href: `${T}/support/energy/powerwall/learn/incentives` },
      { label: "Support", href: `${T}/support/energy` },
      { label: "Partner with Tesla", href: `${T}/support/energy/powerwall/installer-resources/partner-with-tesla` },
      { label: "Commercial", href: `${T}/commercial` },
      { label: "Utilities", href: `${T}/utilities` },
    ],
  },
  {
    kind: "cards",
    label: "Charging",
    cards: [
      { title: "Charging", href: `${T}/charging`, image: mega("Mega-Menu-Charging-Charging.png"), links: [{ label: "Learn", href: `${T}/charging` }] },
      { title: "Home Charging", href: `${T}/home-charging`, image: mega("Mega-Menu-Charging-Home-Charging.png"), links: [{ label: "Learn", href: `${T}/home-charging` }, { label: "Shop", href: "https://shop.tesla.com/category/charging#charging.at-home" }] },
      { title: "Supercharging", href: `${T}/supercharger`, image: mega("Mega-Menu-Charging-Supercharging-NA.png"), links: [{ label: "Learn", href: `${T}/supercharger` }, { label: "Find", href: `${T}/findus` }] },
      { title: "Wall Connector for Business", href: `${T}/commercial-wall-connector`, image: mega("Mega-Menu-Charging-Charging-for-Business.png"), links: [{ label: "Learn", href: `${T}/commercial-wall-connector` }, { label: "Order", href: `${T}/commercial-wall-connector/get` }] },
      { title: "Supercharger for Business", href: `${T}/supercharger-for-business`, image: mega("Mega-Menu-Charging-Supercharger-For-Business.png"), links: [{ label: "Learn", href: `${T}/supercharger-for-business` }, { label: "Order", href: `${T}/supercharger-for-business/get` }] },
    ],
    list: [
      { label: "Help Me Charge", href: `${T}/help-me-charge` },
      { label: "Charging Calculator", href: `${T}/charging-calculator` },
      { label: "Charging With NACS", href: `${T}/NACS` },
      { label: "Supercharger Voting", href: `${T}/supercharger-voting/overview` },
      { label: "Host a Supercharger", href: `${T}/host-a-supercharger` },
      { label: "Powershare", href: `${T}/powershare` },
    ],
  },
  {
    kind: "cards",
    label: "Robotaxi",
    cards: [
      { title: "Robotaxi", href: `${T}/robotaxi`, image: mega("v1792519368/Mega-Menu-Robotaxi.png"), links: [{ label: "Learn", href: `${T}/robotaxi` }] },
    ],
    list: [
      { label: "Safety", href: `${T}/robotaxi/safety` },
      { label: "First Responders", href: `${T}/robotaxi/first-responders` },
      { label: "Support", href: `${T}/support/robotaxi` },
    ],
  },
  {
    kind: "cards",
    label: "Semi",
    cards: [
      { title: "Semi", href: `${T}/semi`, image: `${CDN}/f_auto,q_auto/Mega-Menu-Semi.jpg`, links: [{ label: "Learn", href: `${T}/semi` }] },
      { title: "Semi Charging for Business", href: `${T}/semi-charging-for-business`, image: mega("Mega-Menu-Charging-Semi-Charging-For-Business.jpg"), links: [{ label: "Learn", href: `${T}/semi-charging-for-business` }, { label: "Order", href: `${T}/semi-charging-for-business/get` }] },
    ],
    list: [
      { label: "Find Us", href: `${T}/findus?filters=tesla_exclusive_megachargers%2Ccoming_soon_megachargers%2Call_megachargers` },
      { label: "Tesla for Business", href: "https://business.tesla.com/" },
    ],
  },
  {
    kind: "columns",
    label: "Discover",
    columns: [
      {
        heading: "Resources",
        links: [
          { label: "Demo Drive", href: `${T}/drive` },
          { label: "Insurance", href: `${T}/insurance` },
          { label: "Current Offers", href: `${T}/current-offers` },
          { label: "Learn", href: `${T}/learn` },
          { label: "Video Guides", href: `${T}/support/videos` },
          { label: "Customer Stories", href: `${T}/customer-stories` },
          { label: "Events", href: `${T}/events` },
          { label: "Safety", href: `${T}/safety` },
        ],
      },
      {
        heading: "Location Services",
        links: [
          { label: "Find Us", href: `${T}/findus` },
          { label: "Find a Collision Center", href: `${T}/support/collision-support` },
          { label: "Find a Certified Installer", href: `${T}/support/certified-installers` },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: `${T}/about` },
          { label: "Careers", href: `${T}/careers` },
          { label: "Investor Relations", href: "https://ir.tesla.com/" },
        ],
      },
    ],
  },
  {
    kind: "shop",
    label: "Shop",
    href: "https://shop.tesla.com/",
    cards: [
      { title: "Charging", href: "https://shop.tesla.com/category/charging", image: mega("Mega-Menu-Shop-Charging.png") },
      { title: "Vehicle Accessories", href: "https://shop.tesla.com/category/vehicle-accessories", image: mega("Mega-Menu-Shop-Vehicle-Accessories.png") },
      { title: "Apparel", href: "https://shop.tesla.com/category/apparel", image: mega("Mega-Menu-Shop-Apparel.png") },
      { title: "Lifestyle", href: "https://shop.tesla.com/category/lifestyle", image: mega("Mega-Menu-Shop-Lifestyle.png") },
    ],
  },
];

/** Mobile цэсний холбоосууд. `arrow` нь баруун талд › тэмдэг харуулна. */
export const mobileLinks: (LinkItem & { arrow?: boolean })[] = [
  { label: "Vehicles", href: `${T}/model3`, arrow: true },
  { label: "Energy", href: `${T}/solarpanels`, arrow: true },
  { label: "Charging", href: `${T}/charging`, arrow: true },
  { label: "Robotaxi", href: `${T}/robotaxi`, arrow: true },
  { label: "Semi", href: `${T}/semi`, arrow: true },
  { label: "Discover", href: `${T}/learn`, arrow: true },
  { label: "Shop", href: "https://shop.tesla.com/" },
  { label: "Support", href: `${T}/support` },
  { label: "Account", href: `${T}/teslaaccount` },
  { label: "United States · English", href: "#" },
];
