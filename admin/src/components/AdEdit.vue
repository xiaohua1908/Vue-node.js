<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}广告</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
            <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id">

            </el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告"> 
 
         <el-button @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
            <el-row type="flex" style="flex-wrap:wrap" >
              <el-col :md="24" v-for="(item,index) in model.items" :key="index">
                <el-form-item label="跳转连接URL" style="margin-top:15px">
                  <el-input type="text" v-model="item.url"></el-input>
                </el-form-item>
                <el-form-item label="图片" style="margin-top:15px">
                  <el-upload
              class="avatar-uploader"
              :action=" $http.defaults.baseURL + '/upload' "
              :show-file-list="false"
              :on-success="res=>$set(item,'image',res.url)">
              <img v-if="item.image" :src="item.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
                </el-form-item>
        
                <el-form-item>
                  <el-button size="small" type="danger" @click="model.items.splice(index,1)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdEdit",
  props: {
    id: {}
  },
  data() {
    return {
      model: { name: "",items:[] },
      
    };
  },
  methods: {
    async save() {

      if (this.model.name.trim() == "") {
        this.$message({
          type: "error",
          message: "不能为空，请重新输入"
        });
      } else {
        let res
        if(this.id){
            res = await this.$http.put(`rest/ads/${this.id}`, this.model);
        }
        else{
            res = await this.$http.post('rest/ads', this.model);
        }
        // const res = await this.$http.post("ads", this.model);
        this.$router.push("/ads/list");
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}` );
      this.model = Object.assign({},this.model,res.data);
    }
  },
  created(){
      // this.fetchParents()
      this.id && this.fetch()
  }
};
</script>

<style>
</style>