import React, { useState } from 'react'
import { useGetAllTermsQuery } from '../store/glossaryApi'
import GlossaryTermItem from '../components/glossary/GlossaryTermItem';
import { GlossaryFilterForm, Pagination } from '@amen24/ui';
import { useTranslation } from 'react-i18next';
import { Lang } from '@amen24/shared';

const ITEMS_PER_PAGE = 10;

const Glossary: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [page, setPage] = useState(1);

  const lang = i18n.language as Lang;

  const { data, isLoading } = useGetAllTermsQuery({
    lang,
    term: filterTerm || undefined,
    limit: ITEMS_PER_PAGE,
    page,
  });

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setFilterTerm(query.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    if (data && newPage >= 1 && newPage <= data.meta.lastPage) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <GlossaryFilterForm t={t} query={query} onInputChange={handleInputChange} onSubmit={handleFilter} />

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