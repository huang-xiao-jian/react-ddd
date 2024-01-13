import { describe, expect, it } from '@jest/globals';
import { DocumentTypeReflector } from '../document-type';

describe('DocumentTypeReflector', () => {
  it('should reflect selections into data source', () => {
    const reflector = new DocumentTypeReflector({
      documentTypes: [
        {
          name: 'name1',
          code: 'code1',
        },
        {
          name: 'name2',
          code: 'code2',
        },
        {
          name: 'name3',
          code: 'code3',
        },
      ],
    });
    const result = reflector.reflect(['code1', 'code3']);

    expect(result).toEqual([
      {
        name: 'name1',
        code: 'code1',
      },
      {
        name: 'name3',
        code: 'code3',
      },
    ]);
  });

  it('should tolerate empty input document types', () => {
    const reflector = new DocumentTypeReflector({
      documentTypes: [],
    });
    const result = reflector.reflect(['code1']);

    expect(result).toEqual([]);
  });

  it('should ignore non-exist code in reflection', () => {
    const reflector = new DocumentTypeReflector({
      documentTypes: [
        {
          name: 'name1',
          code: 'code1',
        },
        {
          name: 'name2',
          code: 'code2',
        },
        {
          name: 'name3',
          code: 'code3',
        },
      ],
    });
    const result = reflector.reflect(['code1', 'code-not-exist']);

    expect(result).toEqual([
      {
        name: 'name1',
        code: 'code1',
      },
    ]);
  });
});
