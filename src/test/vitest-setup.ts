import '@testing-library/jest-dom/vitest';
import 'src/i18n';

// @ts-ignore userAgentData is experimental, TypeScript does not have the type declarations
navigator.userAgentData = { platform: 'macOS' };
