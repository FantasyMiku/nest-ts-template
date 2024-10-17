import { Bootstrap } from './bootstrap';

// bootloader
Bootstrap().catch((err) => {
  console.error(err);
  console.error(err.stack);
  process.exit(1);
});
