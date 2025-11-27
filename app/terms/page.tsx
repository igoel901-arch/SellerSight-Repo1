import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#0F1111]">

      {/* 🔙 Back to chatbot*/}
      <div className="bg-white/70 backdrop-blur border-b border-gray-200 sticky top-0 py-3 px-6 flex items-center">
        <Link
          href="/"
          className="text-sm font-medium text-[#4C6FFF] hover:underline"
        >
          ← Back to Chat
        </Link>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          SellerSight – Terms &amp; Use Guidelines
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Last updated: November 2025
        </p>

        <div className="space-y-5 text-sm leading-relaxed text-gray-800">

          <section>
            <h2 className="font-semibold mb-1">1. What SellerSight Is</h2>
            <p>
              SellerSight is a student-built prototype that analyzes Amazon
              product reviews and provides high-level insights for learning and
              experimentation. It is designed for Amazon sellers, brand owners,
              and D2C founders who want a faster way to understand customer
              feedback.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1">2. No Affiliation with Amazon</h2>
            <p>
              SellerSight is <span className="font-semibold">not</span> affiliated with,
              endorsed by, or sponsored by Amazon or any other marketplace. Any
              mention of “Amazon”, “ASIN”, or related trademarks is solely for
              descriptive purposes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1">3. Data &amp; Limitations</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Insights are generated from a limited dataset of historical
                product reviews and may be incomplete or out of date.
              </li>
              <li>
                Outputs are statistical and qualitative, not exact facts.
              </li>
              <li>
                SellerSight may occasionally be inaccurate, inconsistent, or
                miss important edge cases.
              </li>
            </ul>
            <p className="mt-2">
              You should always validate important conclusions using your own
              data, domain expertise, and professional judgement.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1">4. Appropriate Use</h2>
            <p className="mb-1">
              By using SellerSight, you agree that you will:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use it only for lawful, ethical business purposes.</li>
              <li>
                Not attempt to use it for scraping, bypassing platform policies,
                or automating review manipulation.
              </li>
              <li>
                Not treat its outputs as financial, legal, or tax advice.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-1">5. No Confidential or Personal Data</h2>
            <p>
              Please do <span className="font-semibold">not</span> enter any
              confidential information, personal data (PII), or proprietary
              business secrets into the chat. Any data you choose to share is
              provided at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1">6. No Guarantees</h2>
            <p>
              SellerSight is provided “as is”, without any guarantees of
              accuracy, completeness, uptime, or business impact. The creators
              are not responsible for decisions made based on its outputs.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1">7. Academic Context</h2>
            <p>
              This project was created as part of an academic capstone at BITS
              School of Management (BITSoM). Conversations with the assistant
              may be logged and reviewed for debugging, model improvement, and
              academic evaluation.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

/**
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#0F1111]">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          SellerSight – Terms &amp; Use Guidelines
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Last updated: November 2025
        </p>

        <div className="space-y-5 text-sm leading-relaxed text-gray-800">
          <section>
            <h2 className="font-semibold mb-1">1. What SellerSight Is</h2>
            <p>
              SellerSight is a student-built prototype that analyzes Amazon
              product reviews and provides high-level insights for learning and
              experimentation. It is designed for Amazon sellers, brand owners,
              and D2C founders who want a faster way to understand customer
              feedback.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1">2. No Affiliation with Amazon</h2>
            <p>
              SellerSight is <span className="font-semibold">not</span> affiliated with,
              endorsed by, or sponsored by Amazon or any other marketplace. Any
              mention of “Amazon”, “ASIN”, or related trademarks is solely for
              descriptive purposes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1">3. Data &amp; Limitations</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Insights are generated from a limited dataset of historical
                product reviews and may be incomplete or out of date.
              </li>
              <li>
                Outputs are statistical and qualitative, not exact facts.
              </li>
              <li>
                SellerSight may occasionally be inaccurate, inconsistent, or
                miss important edge cases.
              </li>
            </ul>
            <p className="mt-2">
              You should always validate important conclusions using your own
              data, domain expertise, and professional judgement.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1">4. Appropriate Use</h2>
            <p className="mb-1">
              By using SellerSight, you agree that you will:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use it only for lawful, ethical business purposes.</li>
              <li>
                Not attempt to use it for scraping, bypassing platform policies,
                or automating review manipulation.
              </li>
              <li>
                Not treat its outputs as financial, legal, or tax advice.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-1">5. No Confidential or Personal Data</h2>
            <p>
              Please do <span className="font-semibold">not</span> enter any
              confidential information, personal data (PII), or proprietary
              business secrets into the chat. Any data you choose to share is
              provided at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1">6. No Guarantees</h2>
            <p>
              SellerSight is provided “as is”, without any guarantees of
              accuracy, completeness, uptime, or business impact. The creators
              are not responsible for decisions made based on its outputs.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1">7. Academic Context</h2>
            <p>
              This project was created as part of an academic capstone at BITS
              School of Management (BITSoM). Conversations with the assistant
              may be logged and reviewed for debugging, model improvement, and
              academic evaluation.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

/**
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { OWNER_NAME } from "@/config";

export default function Terms() {
    return (
        <div className="w-full flex justify-center p-10">
            <div className="w-full max-w-screen-md space-y-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 underline"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Chatbot
                </Link>
                <h1 className="text-3xl font-bold">MyAI3</h1>
                <h2 className="text-2xl font-semibold">Terms of Use / Disclaimer</h2>

                <p className="text-gray-700">
                    The following terms of use govern access to and use of the MyAI3
                    Assistant ("AI Chatbot"), an artificial intelligence tool provided by
                    {OWNER_NAME} ("I", "me", or "myself"). By engaging with the AI
                    Chatbot, you agree to these terms. If you do not agree, you may not
                    use the AI Chatbot.
                </p>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">General Information</h3>
                    <ol className="list-decimal list-inside space-y-3">
                        <li className="text-gray-700">
                            <span className="font-semibold">Provider and Purpose:</span> The
                            AI Chatbot is a tool developed and maintained by {OWNER_NAME}. It
                            is intended solely to assist users with questions and coursework
                            related to courses taught by {OWNER_NAME}. The AI Chatbot is not
                            affiliated with, endorsed by, or operated by the course provider.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-semibold">Third-Party Involvement:</span>{" "}
                            The AI Chatbot utilizes multiple third-party platforms and
                            vendors, some of which operate outside the United States. Your
                            inputs may be transmitted, processed, and stored by these
                            third-party systems. As such, confidentiality, security, and privacy
                            cannot be guaranteed, and data transmission may be inherently
                            insecure and subject to interception.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-semibold">No Guarantee of Accuracy:</span>{" "}
                            The AI Chatbot is designed to provide helpful and relevant
                            responses but may deliver inaccurate, incomplete, or outdated
                            information. Users are strongly encouraged to independently verify
                            any information before relying on it for decisions or actions.
                        </li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Liability</h3>
                    <ol className="list-decimal list-inside space-y-3">
                        <li className="text-gray-700">
                            <span className="font-semibold">Use at Your Own Risk:</span> The
                            AI Chatbot is provided on an "as-is" and "as-available" basis. To
                            the fullest extent permitted by law:
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                                <li>
                                    {OWNER_NAME} disclaims all warranties, express or implied,
                                    including but not limited to warranties of merchantability,
                                    fitness for a particular purpose, and non-infringement.
                                </li>
                                <li>
                                    {OWNER_NAME} is not liable for any errors, inaccuracies, or
                                    omissions in the information provided by the AI Chatbot.
                                </li>
                            </ul>
                        </li>
                        <li className="text-gray-700">
                            <span className="font-semibold">
                                No Responsibility for Damages:
                            </span>{" "}
                            Under no circumstances shall {OWNER_NAME}, his collaborators,
                            partners, affiliated entities, or representatives be liable for
                            any direct, indirect, incidental, consequential, special, or
                            punitive damages arising out of or in connection with the use of
                            the AI Chatbot.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-semibold">
                                Modification or Discontinuation:
                            </span>{" "}
                            I reserve the right to modify, suspend, or discontinue the AI
                            Chatbot's functionalities at any time without notice.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-semibold">Future Fees:</span> While the AI
                            Chatbot is currently provided free of charge, I reserve the right
                            to implement a fee for its use at any time.
                        </li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">User Responsibilities</h3>
                    <ol className="list-decimal list-inside space-y-3">
                        <li className="text-gray-700">
                            <span className="font-semibold">Eligibility:</span> Use of the AI
                            Chatbot is restricted to individuals aged 18 or older.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-semibold">Prohibited Conduct:</span> By
                            using the AI Chatbot, you agree not to:
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                                <li>Post or transmit content that is defamatory, offensive, intimidating, illegal, racist, discriminatory, obscene, or otherwise inappropriate.</li>
                                <li>Use the AI Chatbot to engage in unlawful or unethical activities.</li>
                                <li>Attempt to compromise the security or functionality of the AI Chatbot</li>
                                <li>Copy, distribute, modify, reverse engineer, decompile, or extract the source code of the AI Chatbot without explicit written consent.</li>
                            </ul>
                        </li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Data Privacy and Security</h3>
                    <ol className="list-decimal list-inside space-y-3">
                        <li className="text-gray-700">
                            <span className="font-semibold">No Privacy Guarantee:</span> The
                            AI Chatbot does not guarantee privacy, confidentiality, or
                            security of the information you provide. Conversations may be
                            reviewed by {OWNER_NAME}, collaborators, partners, or affiliated
                            entities for purposes such as improving the AI Chatbot, developing
                            course materials, and conducting research.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-semibold">Public Information:</span> Any
                            information you provide through the AI Chatbot is treated as
                            public.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-semibold">Data Transmission:</span> Inputs
                            may be transmitted to and processed by third-party services.
                        </li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Ownership of Content and Commercial Use</h3>
                    <ol className="list-decimal list-inside space-y-3">
                        <li className="text-gray-700">
                            <span className="font-semibold">Surrender of Rights:</span> By
                            using the AI Chatbot, you irrevocably assign and surrender all rights,
                            title, interest, and intellectual property rights in any content, inputs
                            you provide, and outputs generated by the AI Chatbot to {OWNER_NAME}.
                            This includes, but is not limited to, text, questions, and conversations.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-semibold">Commercial and Research Use:</span>{" "}
                            {OWNER_NAME} reserves the right to use any input provided by users and
                            any output generated by the AI Chatbot for commercial purposes, research,
                            or other activities without compensation or notification to users.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-semibold">No Claim to Gains or Profits:</span>{" "}
                            Users agree that they have no rights, claims, or entitlement to
                            any gains, profits, or benefits derived from the use or
                            exploitation of the content provided to the AI Chatbot.
                        </li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Indemnification</h3>
                    <p className="text-gray-700">
                        By using the AI Chatbot, you agree to indemnify and hold harmless
                        {OWNER_NAME}, his collaborators, partners, affiliated entities, and
                        representatives from any claims, damages, losses, or liabilities
                        arising out of your use of the AI Chatbot or violation of these
                        terms.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Governing Law and Jurisdiction</h3>
                    <p className="text-gray-700">
                        These terms are governed by the laws of the State of North Carolina,
                        United States. Additional jurisdictions may apply for users outside
                        the United States, subject to applicable local laws. In case of
                        conflicts, the laws of North Carolina shall prevail to the extent
                        permissible. Any disputes arising under or in connection with these
                        terms shall be subject to the exclusive jurisdiction of the courts
                        located in North Carolina.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Acceptance of Terms</h3>
                    <p className="text-gray-700">
                        By using the AI Chatbot, you confirm that you have read, understood,
                        and agreed to these Terms of Use and Disclaimer. If you do not
                        agree with any part of these terms, you may not use the AI Chatbot.
                    </p>
                </div>

                <div className="mt-8 text-sm text-gray-600">
                    <p>Last Updated: November 17, 2025</p>
                </div>
            </div>
        </div>
    );
}
*/
