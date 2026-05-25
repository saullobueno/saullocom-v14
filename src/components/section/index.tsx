import { ReactNode } from 'react';

import { Container } from './styles';

interface SectionProps {
  textColor: string;
  children: ReactNode;
}

export default function Section({ textColor, children }: SectionProps) {
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
