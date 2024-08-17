'use client';

import { useRouter } from 'next/navigation';
import classes from './backButton.module.css';

export const BackButton = () => {
  const router = useRouter();
  
  const handleBack = () => router.back();

  return (
    <button className={classes.backButton} onClick={handleBack}>
    ← Back
    </button>
  )
}