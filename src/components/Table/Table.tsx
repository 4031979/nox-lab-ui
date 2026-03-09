import React, { useState } from 'react';
import styles from './Table.module.css';

export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  selectable?: boolean;
  onSelectionChange?: (keys: string[]) => void;
  onSort?: (key: string, direction: SortDirection) => void;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  stickyHeader?: boolean;
  emptyMessage?: string;
  loading?: boolean;
}

export function Table<T>({
  columns, data, keyExtractor, selectable, onSelectionChange,
  onSort, striped, hoverable = true, bordered, stickyHeader,
  emptyMessage = 'No data available.', loading,
}: TableProps<T>) {
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<{ key: string; dir: SortDirection }>({ key: '', dir: null });

  const allKeys = data.map(keyExtractor);
  const allSelected = allKeys.length > 0 && allKeys.every(k => selected.includes(k));
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => {
    const next = allSelected ? [] : allKeys;
    setSelected(next);
    onSelectionChange?.(next);
  };

  const toggleRow = (key: string) => {
    const next = selected.includes(key) ? selected.filter(k => k !== key) : [...selected, key];
    setSelected(next);
    onSelectionChange?.(next);
  };

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable) return;
    const nextDir: SortDirection = sort.key === col.key
      ? sort.dir === 'asc' ? 'desc' : sort.dir === 'desc' ? null : 'asc'
      : 'asc';
    setSort({ key: col.key, dir: nextDir });
    onSort?.(col.key, nextDir);
  };

  return (
    <div className={[styles.wrapper, bordered ? styles.bordered : ''].filter(Boolean).join(' ')}>
      <table className={[
        styles.table,
        striped ? styles.striped : '',
        hoverable ? styles.hoverable : '',
      ].filter(Boolean).join(' ')}>
        <thead className={[styles.thead, stickyHeader ? styles.sticky : ''].filter(Boolean).join(' ')}>
          <tr>
            {selectable && (
              <th className={styles.th} style={{ width: 48 }}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={allSelected}
                  ref={el => { if (el) el.indeterminate = someSelected; }}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                className={[
                  styles.th,
                  col.sortable ? styles.sortable : '',
                  sort.key === col.key ? styles.sorted : '',
                ].filter(Boolean).join(' ')}
                style={{ width: col.width, textAlign: col.align ?? 'left' }}
                onClick={() => handleSort(col)}
                aria-sort={sort.key === col.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                <span className={styles.thInner}>
                  {col.header}
                  {col.sortable && (
                    <span className={styles.sortIcon} aria-hidden="true">
                      {sort.key === col.key && sort.dir === 'asc'  && '↑'}
                      {sort.key === col.key && sort.dir === 'desc' && '↓'}
                      {(sort.key !== col.key || !sort.dir)         && '↕'}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} className={styles.tr}>
                {selectable && <td className={styles.td}><span className={styles.skeletonCell} /></td>}
                {columns.map(col => (
                  <td key={col.key} className={styles.td}>
                    <span className={styles.skeletonCell} style={{ width: '70%' }} />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={selectable ? columns.length + 1 : columns.length}
                className={styles.empty}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map(row => {
              const key = keyExtractor(row);
              const isSelected = selected.includes(key);
              return (
                <tr
                  key={key}
                  className={[styles.tr, isSelected ? styles.trSelected : ''].filter(Boolean).join(' ')}
                >
                  {selectable && (
                    <td className={styles.td}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => toggleRow(key)}
                        aria-label={`Select row ${key}`}
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={styles.td}
                      style={{ textAlign: col.align ?? 'left' }}
                    >
                      {col.accessor(row)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = 'Table';
