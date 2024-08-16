<template>
  <button
    v-bind="attrs"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue';
import { ButtonProps, buttonVariants } from './interface';
import { c } from '../../../utils/css';

const rawAttrs = useAttrs();

const emit = defineEmits(['click']);

const props = withDefaults(
  defineProps<{
    variant?: ButtonProps['variant'];
    size?: ButtonProps['size'];
    disabled?: ButtonProps['disabled'];
  }>(),

  {
    variant: 'primary',
    size: 'normal',
    disabled: false,
  }
);

const attrs = computed<any>(() => {
  const { class: className, ...rest } = rawAttrs;

  return {
    class: c(
      buttonVariants({
        variant: props.variant,
        size: props.size,
        disabled: props.disabled !== false,
        class: className as string,
      })
    ),
    disabled: props.disabled,
    ...rest,
  };
});
const onClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>
