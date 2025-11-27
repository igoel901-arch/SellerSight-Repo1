// =========================
// SellerSight Configuration
// =========================

// Assistant name shown in UI
export const AI_NAME = "SellerSight";

// Footer branding
export const OWNER_NAME = "Manushi & Ishita";

// Button copy
export const CLEAR_CHAT_TEXT = "New analysis";

// --------------------------------------------
// First Message to User (explicit newlines)
// --------------------------------------------
export const WELCOME_MESSAGE =
  "Hi, I'm SellerSight 👋\n" +
  "Your Amazon review intelligence assistant for Amazon sellers, brand managers, and D2C founders.\n\n" +

  "I help you:\n" +
  "• Spot top customer complaints & delights\n" +
  "• Identify feature gaps and improvement opportunities\n" +
  "• Compare products using review insights\n" +
  "• Get clear, actionable recommendations\n\n" +

  "To begin, share:\n" +
  "• ASIN (or competitor ASINs)\n" +
  "• Your goal (launch, optimise, compare)\n\n" +

  'Example: "Summarise key complaints for ASIN B09XYZ1234 on Amazon IN"';

// --------------------------------------------
// Moderation + Safety Messages
// --------------------------------------------
export const MODERATION_DENIAL_MESSAGE_ILLEGAL =
  "I analyze Amazon product reviews and business questions only. I can't assist with illegal, harmful, or policy-violating requests.";

export const MODERATION_DENIAL_MESSAGE_SEXUAL =
  "I can help with professional Amazon product and business topics only — not explicit or sexual content.";

export const MODERATION_DENIAL_MESSAGE_VIOLENCE =
  "I’m here for Amazon product and business questions — not violent or harmful requests.";
