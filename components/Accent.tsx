import { Fragment } from 'react';

/** Renders a string where words between *asterisks* are wrapped in <em> (shown in orange). */
export default function Accent({ text }: { text: string }) {
  const parts = text.split('*');
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}
