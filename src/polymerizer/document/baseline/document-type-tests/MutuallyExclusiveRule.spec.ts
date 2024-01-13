import { DocumentTypeCategory } from '@/polymerizer/document/vo';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { DocumentTypeMutuallyExclusiveRule } from '../document-type/MutuallyExclusiveRule';

function createMutuallyExclusiveRule() {
  return new DocumentTypeMutuallyExclusiveRule({
    documentTypes: [
      {
        name: 'name1',
        code: 'code1',
        category: DocumentTypeCategory.Singleton,
      },
      {
        name: 'name2',
        code: 'code2',
        category: DocumentTypeCategory.Singleton,
      },
      {
        name: 'name3',
        code: 'code3',
        category: DocumentTypeCategory.Group,
      },
      {
        name: 'name4',
        code: 'code4',
        category: DocumentTypeCategory.Group,
      },
      {
        name: 'name5',
        code: 'code5',
      },
    ],
  });
}

describe('MutuallyExclusiveRule', () => {
  describe('MutuallyExclusiveRule with empty input', () => {
    it('should infer properly', () => {
      const rule = new DocumentTypeMutuallyExclusiveRule({
        documentTypes: [],
      });

      expect(rule.execute().size).toEqual(0);
      expect(rule.execute(['code1']).size).toEqual(0);
    });
  });

  describe('MutuallyExclusiveRule with useful input', () => {
    const example = {
      rule: createMutuallyExclusiveRule(),
    };

    beforeEach(() => {
      example.rule = createMutuallyExclusiveRule();
    });

    it('should infer properly when selection is empty', () => {
      expect(example.rule.execute().size).toEqual(0);
    });

    it('should infer group types when select singleton type', () => {
      const result = example.rule.execute(['code1']);

      expect(result.size).toEqual(2);
      expect(result).toContain('code3');
      expect(result).toContain('code4');
    });

    it('should infer singleton types when select group type', () => {
      const result = example.rule.execute(['code3']);

      expect(result.size).toEqual(3);
      expect(result).toContain('code1');
      expect(result).toContain('code2');
      expect(result).toContain('code5');
    });
  });
});
