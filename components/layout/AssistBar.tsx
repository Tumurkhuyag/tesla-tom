import { ChatIcon, SendIcon, SteeringWheelIcon } from "@/components/icons";

const pill =
  "flex h-10 items-center gap-2 rounded-btn border border-line bg-white text-sm leading-none font-medium text-ink-2";

/** Хуудасны доод талд тогтмол байрлах туслах мөр */
export function AssistBar() {
  return (
    <div
      role="complementary"
      aria-label="Tesla Assist"
      className="fixed inset-x-0 bottom-0 z-30 flex justify-center gap-4 bg-white/92 px-4 py-2.5 backdrop-blur-[12px]"
    >
      <a href="https://www.tesla.com/support" className={`${pill} flex-1 pr-3 pl-5 md:w-[540px] md:flex-none`}>
        <ChatIcon />
        <span>Ask a Question</span>
        <span className="hidden flex-1 truncate text-[#8e8e8e] md:block">&quot;Compare Model 3 and Model Y&quot;</span>
        <span className="grid size-6 place-items-center rounded-[4px] bg-[#e2e3e3]">
          <SendIcon />
        </span>
      </a>
      <a href="https://www.tesla.com/drive" className={`${pill} px-3 md:px-6`}>
        <SteeringWheelIcon />
        <span className="hidden sm:inline">Schedule a Drive Today</span>
      </a>
    </div>
  );
}
