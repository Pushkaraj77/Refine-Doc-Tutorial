import { Refine } from "@refinedev/core";

import {
  RefineSnackbarProvider,
  ThemedLayoutV2,
  notificationProvider,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/mui";

import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { BlogPostList } from "pages/blog-posts/list";
import { BlogPostEdit } from "pages/blog-posts/edit";
import { BlogPostShow } from "pages/blog-posts/show";
import { BlogPostCreate } from "pages/blog-posts/create";
import authProvider from "authProvider";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={RefineThemes.BlueDark}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <BrowserRouter>
          <Refine
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
              {
                name: "blog_posts",
                list: "/blog-posts",
                show: "/blog-posts/show/:id",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
                meta: {
                  canDelete: true,
                }
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="blog_posts" />}
                />

                <Route path="blog-posts">
                  <Route index element={<BlogPostList />} />
                  <Route path="show/:id" element={<BlogPostShow />} />
                  <Route path="edit/:id" element={<BlogPostEdit />} />
                  <Route path="create" element={<BlogPostCreate />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
          </Refine>
        </BrowserRouter>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
