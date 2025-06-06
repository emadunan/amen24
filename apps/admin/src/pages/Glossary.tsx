import React, { useEffect, useState } from 'react'
import { useLazyGetAllTermsQuery } from '../store/glossaryApi'
import GlossaryTermItem from '../components/glossary/GlossaryTermItem';
import { GlossaryFilterForm, Pagination } from '@amen24/ui';
import { useTranslation } from 'react-i18next';
import { Lang } from '@amen24/shared';

const ITEMS_PER_PAGE = 10;

const Glossary: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [bookKey, setBookKey] = useState('');
  const [chapter, setChapter] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');
  const [page, setPage] = useState(1);

  const lang = i18n.language as Lang;

  const [handleFetchTerms, { data, isLoading }] = useLazyGetAllTermsQuery();

  const fetchTerms = async (pageToUse = page) => {
    try {
      await handleFetchTerms({
        lang,
        term: query,
        bookKey,
        chapter,
        approvalStatus,
        limit: ITEMS_PER_PAGE,
        page: pageToUse,
      }).unwrap();
    } catch (error) {
      console.error('Failed to fetch glossary terms');
    }
  };

  useEffect(() => {
    fetchTerms();
  }, [page]);

  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchTerms(1);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleBookKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookKey(e.target.value);
  };

  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChapter(e.target.value);
  };

  const handleApprovalStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setApprovalStatus(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    if (data && newPage >= 1 && newPage <= data.meta.lastPage) {
      setPage(newPage);
    }
  };

  const handleReset = () => {
    setPage(1);
    setQuery('');
    setBookKey('');
    setChapter('');
    setApprovalStatus('');
    fetchTerms(1);
  }

  return (
    <div>
      <GlossaryFilterForm t={t} ui='advanced' query={query} bookKey={bookKey} chapter={chapter} approvalStatus={approvalStatus} onQueryChange={handleQueryChange} onBookChange={handleBookKeyChange} onChapterChange={handleChapterChange} onApprovalStatusChange={handleApprovalStatusChange} onSubmit={handleFilter} onReset={handleReset} />

      {isLoading ? (
        <p>{t("loading")}</p>
      ) : (
        <>
          <div>{data?.data.map(t => <GlossaryTermItem key={t.id} item={t} />)}</div>

          {data && <Pagination t={t} lang={lang} page={page} lastPage={data?.meta.lastPage} onPageChange={handlePageChange} />}
        </>
      )}
    </div>
  )
}

export default Glossary;