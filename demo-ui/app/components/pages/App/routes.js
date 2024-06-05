import { lazy } from 'react';
const Listing = lazy(() => import('../Listing'));
const ViewApplication = lazy(() => import('../ViewApplication'));
const CreateApplication = lazy(() => import('../CreateApplication'));

const routes = [
  {
    exact: true,
    path: `/`,
    component: Listing,
  },
  {
    path: `/view/:applicationId`,
    component: ViewApplication,
  },
  {
    exact: true,
    path: `/create/application`,
    component: CreateApplication,
  },
  {
    exact: true,
    path: `/edit/:applicationId`,
    component: CreateApplication,
  },
  {
    exact: true,
    path: `/accessForbidden`,
    component: lazy(() => import('@capillarytech/vulcan-react-sdk/components/AccessForbidden')),
  },
];

export default routes;
