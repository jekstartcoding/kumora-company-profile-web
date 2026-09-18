// Fase 6 — halaman generik resource CMS singleton: render SingletonResourceForm
// sesuai config, dengan uploader gambar ke bucket cms-images.
import SingletonResourceForm from '../../components/SingletonResourceForm';
import { uploadCmsImage } from '../../components/CmsImageUploader';
import { CMS_SINGLETON_CONFIGS } from './config';

interface Props {
  slug: string;
}

export default function CmsSingletonPage({ slug }: Props) {
  const config = CMS_SINGLETON_CONFIGS[slug];
  if (!config) {
    return <div className="adm-card"><div className="adm-card-body text-sm text-red-600">Resource "{slug}" tidak dikenal.</div></div>;
  }
  return (
    <SingletonResourceForm
      title={config.name}
      endpoint={config.endpoint}
      fields={config.formFields}
      uploadFile={uploadCmsImage}
    />
  );
}
