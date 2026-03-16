import { useEffect, useCallback } from 'react';

/**
 * Custom logging hook following tesspy's logging section concept.
 * Provides a way to configure and emit library logs.
 * @param {string} level - 'INFO' | 'DEBUG' | 'WARN' | 'ERROR'
 * @returns {Object} logger methods
 */
const useLogger = (level = 'INFO') => {
  const log = useCallback((msg, msgLevel = 'INFO') => {
    const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    if (levels.indexOf(msgLevel) >= levels.indexOf(level)) {
      console.log(`[accessmap-react][${msgLevel}] ${msg}`);
    }
  }, [level]);

  return {
    info: (msg) => log(msg, 'INFO'),
    debug: (msg) => log(msg, 'DEBUG'),
    warn: (msg) => log(msg, 'WARN'),
    error: (msg) => log(msg, 'ERROR'),
  };
};

export default useLogger;
