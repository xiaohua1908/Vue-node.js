<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
        <!-- <el-input v-model=""></el-input> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "ArticleEdit",
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: { title: "" },
      categories: []
    };
  },
  methods: {
    async save() {
      if (this.model.title.trim() == "") {
        this.$message({
          type: "error",
          message: "不能为空，请重新输入"
        });
      } else {
        let res;
        if (this.id) {
          res = await this.$http.put(`rest/articles/${this.id}`, this.model);
        } else {
          res = await this.$http.post("rest/articles", this.model);
        }
        // const res = await this.$http.post("categories", this.model);
        this.$router.push("/articles/list");
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();

      // axios({
      //   url: "https://fakeapi.yoursite.com/images",
      //   method: "POST",
      //   data: formData
      // })
      //   .then(result => {
      //     let url = result.data.url; // Get url from response
      //     Editor.insertEmbed(cursorLocation, "image", url);
      //     resetUploader();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>

<style>
</style>