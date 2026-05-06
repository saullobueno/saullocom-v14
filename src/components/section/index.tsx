import { ReactNode } from 'react';

import { Container } from './styles';

interface SectionProps {
  background: string;
  textColor: string;
  children: ReactNode;
}

export default function Section({ background, textColor, children }: SectionProps) {
  return (
    <Container
      style={{
        color: textColor,
      }}
    >
      <div className="content">{children}</div>
    </Container>
  );
}
