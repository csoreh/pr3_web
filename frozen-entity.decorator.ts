export function FrozenEntity() {
  return function <TClass extends abstract new (...args: never[]) => object>(
    target: TClass
  ): void {
    Object.freeze(target.prototype);
    Object.freeze(target);
  };
}
