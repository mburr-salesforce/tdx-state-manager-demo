import { SignalBaseClass } from '@lwc/signals';
import { defineState } from '@lwc/state';
import type { Signal } from '@lwc/signals';

export const marvelousStateMgr = defineState(
  (atom, computed, update, _fromContext) =>
  (initialAge: number | Signal<number>, initialName: string) => {
    // This is not the cleanest. You'd probably either accept a number or a
    // Signal<number> as an argument. This demo is just reused from the v1
    // state manager implementation.
    const age = typeof initialAge === 'number' ? atom(initialAge) : initialAge;

    const name = atom(initialName ?? 'Strange');

    const birthdayInfo = computed({ age, name }, ({ age, name }) => `${name} is ${age} years old`);

    const celebrateBirthday = update({ age }, ({ age }, num: number = 1) => ({
      age: age + num,
    }));

    const graduate = update({ name }, ({ name }) => ({
      name: `Dr. ${name}`,
    }));

    return {
      age,
      name,
      birthdayInfo,
      celebrateBirthday,
      graduate,
    }
  }
);

class TickSignal extends SignalBaseClass<number> {
  value = 0;
  constructor() {
    super();
    setInterval(() => {
      this.value += 1;
      this.notify();
    }, 1000);
  }
}

export const tickSignal = () => new TickSignal();
