export const scriptTemplate = (name: string, content: string) => `import { ${name} } from 'prosciutto-crudo'

export default () => {
    ${content}
}`;
