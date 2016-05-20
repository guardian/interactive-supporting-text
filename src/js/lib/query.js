export default function q(selectorString) {
    return [].slice.apply(document.querySelectorAll(selectorString));
}
