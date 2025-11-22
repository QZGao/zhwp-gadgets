import state from "./state";
import {getMountedApp, loadCodexAndVue, mountApp, registerCodexComponents, removeDialogMount} from "./dialog";
import {saveModuleText} from "./api";

declare const mw: any;

export type DiffDialogResult = { action: 'save' } | { action: 'cancel' };

/**
 * 顯示差異對話框（Codex + Vue 實作）。
 * 返回一個 Promise，當使用者採取動作時解析結果。
 */
export async function showDiffDialog(diffHtml: JQuery<HTMLElement> | null, diffText: string, startTimestamp: string, baseTimestamp: string): Promise<DiffDialogResult> {
    if (getMountedApp()) removeDialogMount();

    try {
        const {Vue, Codex} = await loadCodexAndVue();
        return await new Promise<DiffDialogResult>((resolve) => {
            let resolved = false;
            const finalize = (result_4: DiffDialogResult) => {
                if (resolved) return;
                resolved = true;
                resolve(result_4);
            };

            const htmlString = diffHtml ? (diffHtml.prop('outerHTML') || diffHtml.html() || '') : '';

            const app = Vue.createMwApp({
                i18n: {
                    title: state.convByVar({hant: '檢視差異', hans: '查看差异'}),
                    save: state.convByVar({hant: '儲存', hans: '保存'}),
                    cancel: state.convByVar({hant: '取消', hans: '取消'}),
                    noDiff: state.convByVar({hant: '無差異。', hans: '无差异。'}),
                    summaryPlaceholder: state.convByVar({hant: '編輯摘要（可留空）', hans: '编辑摘要（可留空）'}),
                }, data() {
                    return {
                        open: true,
                        diffHtml: htmlString || '',
                        diffText: diffText || '',
                        startTimestamp: startTimestamp || '',
                        baseTimestamp: baseTimestamp || '',
                        editSummary: '',
                        saving: false
                    };
                }, computed: {
                    hasDiff(): boolean {
                        return Boolean(this.diffHtml && this.diffHtml !== '');
                    },
                    primaryAction() {
                        return {
                            label: this.$options.i18n.save,
                            actionType: 'progressive',
                            disabled: !this.hasDiff || this.saving
                        };
                    },
                    defaultAction() {
                        return {
                            label: this.$options.i18n.cancel
                        };
                    }
                }, methods: {
                    async onPrimaryAction() {
                        if (this.saving) return;
                        this.saving = true;
                        try {
                            const res: any = await saveModuleText(this.diffText, this.startTimestamp, this.baseTimestamp, this.editSummary);
                            this.saving = false;
                            if (res === false) {
                                finalize({action: 'save'});
                                this.closeDialog();
                            } else {
                                mw && mw.notify && mw.notify(state.convByVar({hant: '儲存時發生錯誤，請稍後再試。', hans: '保存时发生错误，请稍后再试。'}), {type: 'error'});
                            }
                        } catch (err) {
                            this.saving = false;
                            console.error('[VGTNTool] saveModuleText failed', err);
                            mw && mw.notify && mw.notify(state.convByVar({hant: '儲存時發生錯誤，請稍後再試。', hans: '保存时发生错误，请稍后再试。'}), {type: 'error'});
                        }
                    }, onCancelAction() {
                        finalize({action: 'cancel'});
                        this.closeDialog();
                    }, onUpdateOpen(newValue: boolean) {
                        if (!newValue) this.onCancelAction();
                    }, closeDialog() {
                        this.open = false;
                        setTimeout(() => removeDialogMount(), 200);
                    }
                }, template: `
                        <cdx-dialog
                            v-model:open="open"
                            :title="$options.i18n.title"
                            :use-close-button="true"
                            @update:open="onUpdateOpen"
                            :primary-action="primaryAction"
                            :default-action="defaultAction"
                            @primary="onPrimaryAction"
                            @default="onCancelAction"
                            class="vgtn-diff-dialog review-tool-dialog"
                        >

                            <div class="review-tool-form-section vgtn-diff-dialog__content">
                                <div v-if="!diffHtml || diffHtml === ''" class="vgtn-diff-dialog__nodiff">
                                    {{ $options.i18n.noDiff }}
                                </div>
                                <div v-else class="vgtn-diff-dialog__diff" v-html="diffHtml"></div>
                                <cdx-text-input
                                    v-model="editSummary"
                                    :placeholder="$options.i18n.summaryPlaceholder"
                                    class="vgtn-diff-dialog__summary-input"
                                />
                            </div>

                        </cdx-dialog>
                    `
            });

            registerCodexComponents(app, Codex);
            mountApp(app);
        });
    } catch (error) {
        console.error("[VGTNTool] Failed to open diff dialog", error);
        mw && mw.notify && mw.notify(state.convByVar({
            hant: "無法開啟差異對話框。",
            hans: "无法开启差异对话框。"
        }), {type: "error", title: "[VGTNTool]"});
        throw error;
    }
}