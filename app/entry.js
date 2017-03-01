/**
 * Webpack doesn't allow for importing modules from the entry
 * file directly. Since we do that often with "dispatch", we
 * can use this file as the entry point instead.
 */
import entireApp from 'index'
