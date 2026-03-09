import React from 'react';
import styles from './Stepper.module.css';

export type StepStatus = 'complete' | 'current' | 'upcoming';

export interface Step {
  id: string;
  label: string;
  date?: string;
  status: StepStatus;
}

export interface StepperProps {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
}

export const Stepper: React.FC<StepperProps> = ({ steps, orientation = 'horizontal' }) => {
  return (
    <div className={[styles.root, styles[orientation]].join(' ')}>
      {/* Track bar */}
      <div className={styles.track}>
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={[
              styles.segment,
              step.status === 'complete' ? styles.segmentComplete : '',
              step.status === 'current' ? styles.segmentCurrent : '',
            ].filter(Boolean).join(' ')}
          >
            <span className={[
              styles.dot,
              step.status === 'complete' ? styles.dotComplete : '',
              step.status === 'current' ? styles.dotCurrent : '',
            ].filter(Boolean).join(' ')}>
              {step.status === 'complete' && (
                <svg viewBox="0 0 12 12" fill="none">
                  <polyline points="1.5,6 4.5,9.5 10.5,2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {step.status === 'current' && <span className={styles.dotPulse} />}
            </span>
            {i < steps.length - 1 && (
              <span className={[
                styles.line,
                step.status === 'complete' ? styles.lineComplete : '',
              ].filter(Boolean).join(' ')} />
            )}
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className={styles.labels}>
        {steps.map(step => (
          <div key={step.id} className={[
            styles.labelItem,
            step.status === 'complete' ? styles.labelComplete : '',
            step.status === 'current' ? styles.labelCurrent : '',
          ].filter(Boolean).join(' ')}>
            <span className={styles.label}>{step.label}</span>
            {step.date && <span className={styles.date}>{step.date}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

Stepper.displayName = 'Stepper';
