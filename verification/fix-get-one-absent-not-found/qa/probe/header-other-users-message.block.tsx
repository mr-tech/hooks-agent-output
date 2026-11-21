
// QA probe block, appended to website b663b35's
// src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx (blob 6a52d2c9)
// in an isolated export; never committed to website. It reuses that file's fixtures and helpers.
// Question: does the edit page's header drop the editor controls for ANOTHER user's existing message
// (the fixer's User-visible flow 3), not only for an absent number (case 2)?
const OTHER_USERS_ID = '900000000000202';

describe('probe: the edit page\'s header for another user\'s message', () => {
  beforeEach(() => {
    mocks.db = createCapturingDatabase(({ sql, parameters }) => {
      if (sql.startsWith('select "userId" from "Accounts"')) return [{ userId: OWNER_DB_ID }];
      if (sql.includes('left join "ScheduledMessages"') && String(parameters[0]) === OTHER_USERS_ID) {
        return [ownMessageRow(OTHER_USERS_ID)];
      }
      if (sql.startsWith('select "fk_users_id" from "Messages"') && parameters.map(String).includes(OTHER_USERS_ID)) {
        return [{ fk_users_id: '900000000000999' }];
      }
      return [];
    }).db;
  });

  it('shows the notice and only the site navigation', async () => {
    const container = mountEditPageWithHeader(OTHER_USERS_ID);

    await vi.waitFor(() => { expect(container.textContent).toContain(NOT_FOUND_TEXT); });

    expect(getOneRequests).toEqual([404]);
    expect(editorControlsIn(container)).toEqual({ nameField: false, menus: [], send: false });
    expect(siteNavigationIn(container)).toEqual({ themeToggle: true, userMenu: true });
  });
});
