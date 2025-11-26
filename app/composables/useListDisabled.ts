/**
 * リスト項目のdisabled状態を判定するユーティリティ
 */
import type { Annotation } from '~/stores/annotations'

/**
 * アノテーション配列からdisabled状態を判定する純粋な関数
 * @param annotations - アノテーション配列
 * @param listName - リスト名（省略時はアノテーションの存在のみチェック）
 * @returns disabled状態
 */
export const checkListDisabledFromAnnotations = (
  annotations: Annotation[] | null | undefined,
  listName?: string
): boolean => {
  if (!annotations || !Array.isArray(annotations)) {
    return true
  }

  if (!listName) {
    // listNameが指定されていない場合は、アノテーションが存在するかのみチェック
    return !annotations.length
  } else if (listName === 'Annotations') {
    return !annotations.length
  } else {
    return !annotations.filter(a => a.category.includes(listName)).length
  }
}
