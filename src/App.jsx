import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BookDemoProvider } from "./context/BookDemoContext.jsx";
import BookDemoModal from "./components/common/BookDemoModal.jsx";
import CustomSoftwareModal from "./components/common/CustomSoftwareModal.jsx";
import SampleDemoModal from "./components/common/SampleDemoModal.jsx";
import ScrollToHash from "./components/common/ScrollToHash.jsx";
import AdminLogin from "./admin/auth/AdminLogin.jsx";
import ProtectedAdminRoute from "./admin/auth/ProtectedAdminRoute.jsx";
import AdminLayout from "./admin/layouts/AdminLayout.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import AdminBlogs from "./admin/pages/AdminBlogs.jsx";
import AdminBlogNew from "./admin/pages/AdminBlogNew.jsx";
import AdminBlogEdit from "./admin/pages/AdminBlogEdit.jsx";
import AdminBlogPreview from "./admin/pages/AdminBlogPreview.jsx";
import AdminCaseStudies from "./admin/pages/AdminCaseStudies.jsx";
import AdminCaseStudyNew from "./admin/pages/AdminCaseStudyNew.jsx";
import AdminCaseStudyEdit from "./admin/pages/AdminCaseStudyEdit.jsx";
import AdminCaseStudyPreview from "./admin/pages/AdminCaseStudyPreview.jsx";
import AdminClients from "./admin/pages/AdminClients.jsx";
import AdminClientNew from "./admin/pages/AdminClientNew.jsx";
import AdminClientEdit from "./admin/pages/AdminClientEdit.jsx";
import AdminFaqs from "./admin/pages/AdminFaqs.jsx";
import AdminFaqNew from "./admin/pages/AdminFaqNew.jsx";
import AdminFaqEdit from "./admin/pages/AdminFaqEdit.jsx";
import Home from "./pages/Home.jsx";
import ComplaintManagement from "./pages/ComplaintManagement.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import CaseStudyDetail from "./pages/CaseStudyDetail.jsx";
import Blog from "./pages/Blog.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import Clients from "./pages/Clients.jsx";
import Company from "./pages/Company.jsx";

const App = () => (
  <BrowserRouter>
    <BookDemoProvider>
      <ScrollToHash />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/new" element={<AdminBlogNew />} />
            <Route path="blogs/:id/edit" element={<AdminBlogEdit />} />
            <Route path="blogs/:id/preview" element={<AdminBlogPreview />} />
            <Route path="case-studies" element={<AdminCaseStudies />} />
            <Route path="case-studies/new" element={<AdminCaseStudyNew />} />
            <Route path="case-studies/:id/edit" element={<AdminCaseStudyEdit />} />
            <Route path="case-studies/:id/preview" element={<AdminCaseStudyPreview />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="clients/new" element={<AdminClientNew />} />
            <Route path="clients/:id/edit" element={<AdminClientEdit />} />
            <Route path="faqs" element={<AdminFaqs />} />
            <Route path="faqs/new" element={<AdminFaqNew />} />
            <Route path="faqs/:id/edit" element={<AdminFaqEdit />} />
          </Route>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/products/complaint-management" element={<ComplaintManagement />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/company" element={<Company />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BookDemoModal />
      <CustomSoftwareModal />
      <SampleDemoModal />
    </BookDemoProvider>
  </BrowserRouter>
);

export default App;
