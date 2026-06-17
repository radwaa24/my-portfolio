import { ref, onMounted, onBeforeUnmount } from "vue";

// ---------------------------------------------------------------------
//  useTypewriter — types an array of lines sequentially.
//  Returns { display } where display is a ref to a string array
//  (one entry per line) so a terminal can render multiple lines.
// ---------------------------------------------------------------------
export function useTypewriter(lines, opts = {}) {
  const speed = opts.speed ?? 28;
  const lineDelay = opts.lineDelay ?? 320;
  const startDelay = opts.startDelay ?? 250;
  const onDone = opts.onDone;

  const display = ref(lines.map(() => ""));
  const done = ref(false);
  let timers = [];

  const wait = (ms) =>
    new Promise((res) => {
      const t = setTimeout(res, ms);
      timers.push(t);
    });

  async function run() {
    await wait(startDelay);
    for (let i = 0; i < lines.length; i++) {
      const text = lines[i];
      for (let c = 0; c <= text.length; c++) {
        display.value[i] = text.slice(0, c);
        // trigger reactivity on array element
        display.value = [...display.value];
        await wait(speed);
      }
      await wait(lineDelay);
    }
    done.value = true;
    onDone?.();
  }

  onMounted(run);
  onBeforeUnmount(() => {
    timers.forEach(clearTimeout);
    timers = [];
  });

  return { display, done };
}
