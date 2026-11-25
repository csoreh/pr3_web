export function LogExecutionTime() {
  return function (
    _target: object,
    methodName: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const wrapped = descriptor.value as (...args: unknown[]) => unknown;

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      const startedAt = performance.now();
      const output = wrapped.apply(this, args);
      const elapsed = (performance.now() - startedAt).toFixed(2);
      console.log(`[BENCHMARK] Метод ${methodName} виконано за ${elapsed} ms.`);
      return output;
    };

    return descriptor;
  };
}
