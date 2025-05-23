import React from 'react'
import { useGetAllTermsQuery } from '../store/glossaryApi'
import GlossaryTermItem from '../components/glossary/GlossaryTermItem';
import PageTitle from '../components/ui/PageTitle';

const Glossary: React.FC = () => {
  const { data: terms } = useGetAllTermsQuery();
  
  return (
    <div>
      <PageTitle>Glossary</PageTitle>
      <div>{terms?.map(t => <GlossaryTermItem key={t.id} item={t}/>)}</div>
    </div>
  )
}

export default Glossary;